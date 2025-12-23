// GitHub Event Types
export interface GitHubEvent {
    id: string;
    type: string;
    created_at: string;
    repo: {
        name: string;
    };
    actor: {
        login: string;
        avatar_url: string;
    };
    payload: any;
}

export interface PullRequestEvent {
    action: 'opened' | 'closed' | 'merged' | 'review_requested';
    number: number;
    pull_request: {
        title: string;
        html_url: string;
        merged: boolean;
        merged_at?: string;
        user: {
            login: string;
        };
    };
}

export interface IssueEvent {
    action: 'opened' | 'closed' | 'assigned';
    issue: {
        number: number;
        title: string;
        html_url: string;
        user: {
            login: string;
        };
    };
}

export interface WorkflowRunEvent {
    action: 'completed';
    workflow_run: {
        name: string;
        conclusion: 'success' | 'failure' | 'cancelled';
        html_url: string;
    };
}

export interface ProcessedEvent {
    id: string;
    type: 'pr' | 'issue' | 'commit' | 'ci' | 'comment';
    category: 'success' | 'warning' | 'info';
    title: string;
    summary: string;
    timestamp: string;
    repo: string;
    url?: string;
    priority: 'high' | 'medium' | 'low';
    impact?: string;
}
