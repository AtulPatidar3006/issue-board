import { createContext, ReactNode, useContext, useState, useReducer } from "react";
import { IssueContextType, Issue } from '../types';
import { reducer, initialState } from "./issueReducer";

export const IssueContext = createContext<IssueContextType | undefined>(undefined);

type IssueContextProviderProps = {
    children: ReactNode;
};

export const IssueContextProvider = ({ children }: IssueContextProviderProps) => {
    const [issueData, setIssueData] = useState<Issue[]>([]);
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <IssueContext.Provider value={{ issueData, setIssueData, state, dispatch }}>
            {children}
        </IssueContext.Provider>
    );
};

// custom hook to use IssueContext
export const useIssueContext = () => {
    const context = useContext(IssueContext);
    if (!context) {
        throw new Error('useIssueContext must be within a IssueContextProvider')
    }
    return context;
}