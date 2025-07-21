export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
    id: string;
    title: string;
    status: string;
    priority: string;
    severity: number;
    createdAt: string;
    assignee: string;
    tags: string[];
}

export type IssueContextType = {
    issueData: Issue[];
    setIssueData: React.Dispatch<React.SetStateAction<Issue[]>>;
}

export type searchSortFilter = {
    search: string;
    assignee: string;
    severity: number;
    sort: string;
}