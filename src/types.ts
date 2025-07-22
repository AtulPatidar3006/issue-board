import { State } from "./utils/issueReducer";
import { Actions } from "./utils/issueActions";

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
    state: State,
    dispatch: React.Dispatch<Actions>
}
