import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createGitHubClient, fetchUserRepos } from '@/lib/github/client';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.accessToken) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const octokit = createGitHubClient(session.accessToken as string);
        const repos = await fetchUserRepos(octokit);

        // Transform to simpler format
        const simplifiedRepos = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            owner: repo.owner.login,
            private: repo.private,
            description: repo.description,
            updated_at: repo.updated_at,
            html_url: repo.html_url,
        }));

        return NextResponse.json({ repos: simplifiedRepos });
    } catch (error) {
        console.error('Error in /api/github/repos:', error);
        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        );
    }
}
