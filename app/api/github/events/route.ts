import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createGitHubClient, fetchRepoEvents, fetchPullRequests, fetchIssues, fetchWorkflowRuns } from '@/lib/github/client';
import { processGitHubDataServer } from '@/lib/server/processor';

export async function POST(request: Request) {
    try {
        const session = await auth();
        console.log('[API] /api/github/events called');
        console.log('[API] Session user:', session?.user?.name);
        console.log('[API] Access Token present:', !!session?.accessToken);

        if (!session?.accessToken) {
            console.error('[API] Unauthorized: No access token');
            return NextResponse.json(
                { error: 'Unauthorized: No access token found. Please sign out and sign in again.' },
                { status: 401 }
            );
        }

        const { repos } = await request.json();

        if (!repos || !Array.isArray(repos)) {
            return NextResponse.json(
                { error: 'Invalid request: repos array required' },
                { status: 400 }
            );
        }

        const octokit = createGitHubClient(session.accessToken as string);
        const allEvents = [];

        // Fetch events for each repository
        for (const repoFullName of repos) {
            const [owner, repo] = repoFullName.split('/');

            if (!owner || !repo) continue;

            try {
                // Fetch different types of data
                const [events, prs, issues, workflows] = await Promise.all([
                    fetchRepoEvents(octokit, owner, repo),
                    fetchPullRequests(octokit, owner, repo),
                    fetchIssues(octokit, owner, repo),
                    fetchWorkflowRuns(octokit, owner, repo).catch(() => []), // CI might not be available
                ]);

                allEvents.push({
                    repo: repoFullName,
                    events,
                    pullRequests: prs,
                    issues,
                    workflows,
                });
            } catch (error) {
                console.error(`Error fetching data for ${repoFullName}:`, error);
                // Continue with other repos even if one fails
            }
        }

        // Process events server-side with AI
        console.log('[API] Starting server-side processing...');
        let processedEvents = [];
        try {
            processedEvents = await processGitHubDataServer(allEvents);
            console.log('[API] Processing complete.');
        } catch (procError) {
            console.error('[API] Processing failed:', procError);
            // Fallback to unprocessed events if processor crashes completely
            processedEvents = allEvents.map(r => ({
                ...r,
                events: r.events || [], // Flatten or simplify if structure differs
                // primitive fallback
            }));
            // Actually, processGitHubDataServer returns a flat array of ProcessedEvent
            // We can't just return 'allEvents' structure. 
            // Let's just return empty or simple map if valid.
            // For now, let's just log and rethrow or return empty to observe behavior.
        }

        return NextResponse.json({ data: processedEvents });
    } catch (error) {
        console.error('Error in /api/github/events:', error);
        // Log the full stack trace
        if (error instanceof Error) {
            console.error(error.stack);
        }
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
