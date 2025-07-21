import { createContext, ReactNode, useContext, useState } from "react";
import { IssueContextType, Issue } from '../types';

export const IssueContext = createContext<IssueContextType | undefined>(undefined);

type IssueContextProviderProps = {
    children: ReactNode;
};

export const IssueContextProvider = ({children} : IssueContextProviderProps) => {
    const [issueData, setIssueData] = useState<Issue[]>([]);

    return(
        <IssueContext.Provider value={{issueData, setIssueData}}>
            {children}
        </IssueContext.Provider>
    );
};

// custom hook to use IssueContext
export const useIssueContext = () => {
    const context = useContext(IssueContext);
    if(!context) {
        throw new Error('useIssueContext must be within a IssueContextProvider')
    }
    return context;
}