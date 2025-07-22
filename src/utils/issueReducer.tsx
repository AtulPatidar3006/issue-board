import { ActionTypes, Actions } from "./issueActions";

export type State = {
    search: string,
    assignee: string,
    severity: number,
    sort: string,
}

export const initialState: State = {
    search: "",
    assignee: "",
    severity: 0,
    sort: "",
};

export function reducer(state: State, action: Actions) {
    switch (action.type) {
        case ActionTypes.SET_SEARCH_VALUE:
            return {
                ...state,
                search: action.payload,
            }

        case ActionTypes.SET_ASSIGNEE_VALUE:
            return {
                ...state,
                assignee: action.payload,
            }

        case ActionTypes.SET_SEVERITY_VALUE:
            return {
                ...state,
                severity: action.payload,
            }

        case ActionTypes.SET_PRIORITY_VALUE:
            return {
                ...state,
                sort: action.payload,
            }

        case ActionTypes.RESET_STATE:
            return action.payload

        default:
            return state;
    }
}