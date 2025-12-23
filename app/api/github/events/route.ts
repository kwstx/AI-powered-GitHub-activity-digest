import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createGitHubClient, fetchRepoEvents, fetchPullRequests, fetchIssues, fetchWorkflowRuns } from '@/lib/github/client';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
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

        return NextResponse.json({ data: allEvents });
    } catch (error) {
        console.error('Error in /api/github/events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}
