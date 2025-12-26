import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Octokit } from '@octokit/rest';

export async function GET() {
    try {
        const session = await auth();
        if (!session?.accessToken) {
            return NextResponse.json({ error: 'No Token' }, { status: 401 });
        }

        const octokit = new Octokit({ auth: session.accessToken });

        // 1. Check Rate Limit & Scopes (via Headers)
        // We make a lightweight call to get headers
        const userRes = await octokit.rest.users.getAuthenticated();
        const scopes = userRes.headers['x-oauth-scopes'];

        // 2. List Events for the User (Private & Public)
        const eventsRes = await octokit.rest.activity.listEventsForAuthenticatedUser({
            username: userRes.data.login,
            per_page: 5
        });

        // 3. List Events for a specific known repo (if configured)
        // We'll try to find 'kwstx/GitCalm' specifically if possible, or just list user repos
        const reposRes = await octokit.rest.repos.listForAuthenticatedUser({ per_page: 5, sort: 'updated' });

        return NextResponse.json({
            debug_info: {
                username: userRes.data.login,
                token_scopes: scopes, // THIS IS THE KEY VALUE WE NEED
                rate_limit: userRes.headers['x-ratelimit-remaining'],
                repo_count: reposRes.data.length
            },
            recent_events_sample: eventsRes.data.map(e => ({ type: e.type, repo: e.repo.name, date: e.created_at })),
            top_repos: reposRes.data.map(r => ({ full_name: r.full_name, private: r.private, permissions: r.permissions }))
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Octokit Call Failed',
            details: error.message,
            status: error.status
        }, { status: 500 });
    }
}
