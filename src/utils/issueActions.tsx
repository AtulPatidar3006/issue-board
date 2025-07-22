export type SearchSortFilter = {
    search: string;
    assignee: string;
    severity: number;
    sort: string;
}

export enum ActionTypes {
    SET_SEARCH_VALUE = "SET_SEARCH_VALUE",
    SET_ASSIGNEE_VALUE = "SET_ASSIGNEE_VALUE",
    SET_SEVERITY_VALUE = "SET_SEVERITY_VALUE",
    SET_PRIORITY_VALUE = "SET_PRIORITY_VALUE",
    RESET_STATE= "RESET_STATE",
}

export type SetSeacrchAction = {
  type: ActionTypes.SET_SEARCH_VALUE;
  payload: string;
};

export type SetAssigneeAction = {
  type: ActionTypes.SET_ASSIGNEE_VALUE;
  payload: string;
};

export type SetSeverityAction = {
  type: ActionTypes.SET_SEVERITY_VALUE;
  payload: number;
};

export type SetPriorityAction = {
  type: ActionTypes.SET_PRIORITY_VALUE;
  payload: string;
};

export type ResetStateAction = {
  type: ActionTypes.RESET_STATE;
  payload: SearchSortFilter;
}

export type Actions = 
|SetSeacrchAction
|SetAssigneeAction
|SetSeverityAction
|SetPriorityAction
|ResetStateAction;