import { ProcessedEvent } from '../github/types';

/**
 * Process raw GitHub data into categorized stories
 */
export function processGitHubData(rawData: any[]): ProcessedEvent[] {
    const events: ProcessedEvent[] = [];

    for (const repoData of rawData) {
        const { repo, pullRequests, issues, workflows } = repoData;

        // Process Pull Requests
        if (pullRequests) {
            for (const pr of pullRequests) {
                const isMerged = pr.merged_at !== null;
                const category = isMerged ? 'success' : 'info';

                events.push({
                    id: `pr-${pr.id}`,
                    type: 'pr',
                    category,
                    title: isMerged
                        ? `PR #${pr.number} merged: ${pr.title}`
                        : `PR #${pr.number}: ${pr.title}`,
                    summary: `Pull request by ${pr.user.login}${isMerged ? ' was successfully merged' : ' is open for review'}.`,
                    timestamp: pr.updated_at,
                    repo: repo.split('/')[1] || repo,
                    url: pr.html_url,
                    priority: isMerged ? 'low' : 'medium',
                    impact: isMerged ? 'Shipped' : undefined,
                });
            }
        }

        // Process Issues
        if (issues) {
            for (const issue of issues) {
                // Skip pull requests (GitHub API returns PRs as issues too)
                if (issue.pull_request) continue;

                const isClosed = issue.state === 'closed';

                events.push({
                    id: `issue-${issue.id}`,
                    type: 'issue',
                    category: 'info',
                    title: `Issue #${issue.number}: ${issue.title}`,
                    summary: `Issue by ${issue.user.login} is ${issue.state}.`,
                    timestamp: issue.updated_at,
                    repo: repo.split('/')[1] || repo,
                    url: issue.html_url,
                    priority: isClosed ? 'low' : 'medium',
                });
            }
        }

        // Process Workflow Runs (CI/CD)
        if (workflows) {
            for (const workflow of workflows) {
                const failed = workflow.conclusion === 'failure';

                if (failed) {
                    events.push({
                        id: `workflow-${workflow.id}`,
                        type: 'ci',
                        category: 'warning',
                        title: `CI Build Failed: ${workflow.name}`,
                        summary: `Workflow "${workflow.name}" failed on ${workflow.head_branch || 'unknown branch'}.`,
                        timestamp: workflow.updated_at,
                        repo: repo.split('/')[1] || repo,
                        url: workflow.html_url,
                        priority: 'high',
                        impact: 'Blocking Deploy',
                    });
                }
            }
        }
    }

    // Sort by timestamp (newest first)
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return events;
}

/**
 * Group related events into stories
 */
export function groupIntoStories(events: ProcessedEvent[]): ProcessedEvent[] {
    // For MVP, we'll return events as-is
    // In future, we can group related PRs, commits, and CI runs
    return events;
}

/**
 * Analyze priority and categorize events
 */
export function analyzePriority(events: ProcessedEvent[]): ProcessedEvent[] {
    return events.map(event => {
        // Boost priority for CI failures
        if (event.type === 'ci' && event.category === 'warning') {
            event.priority = 'high';
            event.priorityReason = 'CI workflow failed on default branch';
        }

        // Boost priority for open PRs mentioning "urgent" or "hotfix"
        if (event.type === 'pr' &&
            (event.title.toLowerCase().includes('urgent') ||
                event.title.toLowerCase().includes('hotfix'))) {
            event.priority = 'high';
            event.category = 'warning';
            event.priorityReason = 'Title contains urgent keywords';
        }

        // Default reasons
        if (!event.priorityReason) {
            if (event.category === 'success') event.priorityReason = 'Successfully completed action';
            if (event.category === 'warning') event.priorityReason = 'Requires user attention';
            if (event.category === 'info') event.priorityReason = 'General update';
        }

        return event;
    });
}
