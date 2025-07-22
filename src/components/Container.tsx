import React, { FC, useMemo, useState } from 'react';
import { Issue } from '../types';
import { IssueCard } from './IssueCard';
import { useIssueContext } from '../utils/issueContext';
import { sortingFuntion } from '../utils/sortingFunction';

interface ContainerProps {
    id: string,
    title: string,
    issueList: Issue[],
}

export const Container: FC<ContainerProps> = ({ id, issueList, title }) => {
    const { state } = useIssueContext();

    const filteredData = useMemo(() => {
        function filterData(list: Issue[], searchValue: string, assigneeValue: string, severityValue: number, sortValue: string) {
            let updatedList = JSON.parse(JSON.stringify(list));
            if (searchValue !== '') {
                updatedList = updatedList.filter((eachItem: Issue) => eachItem.title.toLowerCase().includes(searchValue.toLowerCase()) || eachItem.tags.join(',').toLowerCase().includes(searchValue.toLowerCase()));
            }
            if (assigneeValue !== '') {
                updatedList = updatedList.filter((eachItem: Issue) => eachItem.assignee.toLowerCase().includes(assigneeValue.toLowerCase()));
            }
            if (severityValue !== 0) {
                updatedList = updatedList.filter((eachItem: Issue) => eachItem.severity === severityValue);
            }
            if(sortValue !== ''){
                return sortingFuntion(updatedList, sortValue);
            }
            return updatedList;
        }

        const dataToUpdate = filterData(issueList, state.search, state.assignee, state.severity, state.sort)
        return dataToUpdate;
    }, [state.search, state.assignee, state.severity, state.sort, issueList])

    return (
        <div className='container'>
            <h3>{title.toUpperCase()}</h3>
            <br />
            <div className='card-container'>
                {
                    filteredData.map((issueItem: Issue) => (
                        <IssueCard key={id} issue={issueItem} />
                    ))
                }
            </div>
        </div>
    )
};