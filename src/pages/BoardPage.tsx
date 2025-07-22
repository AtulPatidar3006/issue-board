import React, { useEffect, useState, useReducer } from 'react';
import './BoardPage.css';
import { Container } from './Container';
import { RecentlyVisited } from './RecentlyVisited';
import { mockFetchIssues } from '../utils/api';
import { Issue } from '../types';
import { useIssueContext } from '../utils/issueContext';
import { ActionTypes } from '../utils/issueActions';

export const BoardPage = () => {
    const { issueData, setIssueData, dispatch, state } = useIssueContext();

    const [assigneeData, setAssigneeData] = useState<string[]>([]);

    // to fecth data from mock api
    useEffect(() => {
        // avoid data fetch each time the boarpage loads
        if (issueData.length === 0) {
            mockFetchIssues().then((response) => {
                setIssueData(response as Issue[]);
            }).catch((e) => {
                console.log(e);
            })
        }
    }, [issueData]);

    useEffect(() => {
        const asssignees = issueData.map((eachIssue) => eachIssue.assignee);
        setAssigneeData(asssignees);
    }, [issueData]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            dispatch({
                type: ActionTypes.SET_SEARCH_VALUE,
                payload: event.target.value,
            })
        }
    }

    const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '') {
            dispatch({
                type: ActionTypes.SET_ASSIGNEE_VALUE,
                payload: event.target.value,
            })
        }
    }

    const handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value !== '') {
            dispatch({
                type: ActionTypes.SET_SEVERITY_VALUE,
                payload: parseInt(event.target.value),
            })
        }
    }

    const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: ActionTypes.SET_PRIORITY_VALUE,
            payload: event.target.value,
        })
    }

    const handleReset = () => {
        dispatch({
            type: ActionTypes.RESET_STATE,
            payload: {
                search: "",
                assignee: "",
                severity: 0,
                sort: "",
            },
        })
    }

    return (
        <div className='board-page-container'>
            <div className='left-toolbar'>
                <label htmlFor='search-input' className='input-label'>Search:</label>
                <br></br>
                <input id='search-input' type='text' placeholder='Enter to search...' value={state.search} onChange={handleSearchChange}></input>

                <br />
                <label htmlFor='filter-asssignee' className='input-label'>Assignee:</label>
                <br></br>
                <select id='filter-asssignee' value={state.assignee} onChange={handleAssigneeChange}>
                    <option value=''>Select Assignee...</option>
                    {
                        assigneeData.map((eachAssignee: string) =>
                            <option key={eachAssignee} value={eachAssignee}>{eachAssignee}</option>
                        )
                    }
                </select>

                <br />
                <label htmlFor='filter-severity' className='input-label'>Severity:</label>
                <br></br>
                <select id='filter-severity' value={state.severity} onChange={handleSeverityChange}>
                    <option value={0}>Select Severity...</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>

                <span className='input-label'>Sort By Priority:</span>
                <br />
                <input id='severity-high' type='radio' name='severity' value='high' checked={state.sort === 'high'} onChange={handlePriorityChange} />
                <label htmlFor='severity-high' className='radio-label'>Highest</label>

                <input id='severity-medium' type='radio' name='severity' value='low' checked={state.sort === 'low'} onChange={handlePriorityChange} />
                <label htmlFor='severity-medium' className='radio-label'>Lowest</label>

                <br />
                <br />
                <button className='reset-button' onClick={handleReset}>Reset</button>

                <RecentlyVisited />
            </div>
            <div className='issue-board-container'>
                <Container key='backlog-container' id='backlog' title='Backlog' issueList={issueData.filter((item) => item.status === 'Backlog')} />
                <Container key='inprogress-container' id='inProgress' title='In Progress' issueList={issueData.filter((item) => item.status === 'In Progress')} />
                <Container key='done-container' id='done' title='Done' issueList={issueData.filter((item) => item.status === 'Done')} />
            </div>
        </div>
    );
};
