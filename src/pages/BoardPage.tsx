import React, { useEffect, useState } from 'react';
import './BoardPage.css';
import { Container } from './Container';
import { mockFetchIssues } from '../utils/api';
import { Issue } from '../types';
import { useIssueContext } from '../utils/issueContext';

export const BoardPage = () => {
    const { issueData, setIssueData } = useIssueContext();

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
    }, [issueData])

    useEffect(() => {
        const asssignees = issueData.map((eachIssue) => eachIssue.assignee);
        setAssigneeData(asssignees);
    }, [issueData])

    return (
        <div className='board-page-container'>
            <div className='left-toolbar'>
                <label htmlFor='search-input' className='input-label'>Search:</label>
                <br></br>
                <input id='search-input' type='text' placeholder='Enter to search...'></input>

                <br />
                <label htmlFor='filter-asssignee' className='input-label'>Assignee:</label>
                <br></br>
                <select id='filter-asssignee'>
                    <option value='' selected>Select Assignee...</option>
                    {
                        assigneeData.map((eachAssignee: string) =>
                            <option value={eachAssignee}>{eachAssignee}</option>
                        )
                    }
                </select>

                <br />
                <label htmlFor='filter-severity' className='input-label'>Severity:</label>
                <br></br>
                <select id='filter-severity'>
                    <option value='' selected>Select Severity...</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>


                <span className='input-label'>Sort By Priority:</span>
                <br />
                <input id='severity-high' type='radio' name='severity' value='high' />
                <label htmlFor='severity-high' className='radio-label'>Highest</label>

                <br />
                <input id='severity-medium' type='radio' name='severity' value='low' />
                <label htmlFor='severity-medium' className='radio-label'>Lowest</label>


                <br />
                <br />
                <button className='reset-button'>Reset</button>
            </div>
            <div className='issue-board-container'>
                <Container id='backlog' title='Backlog' issueList={issueData.filter((item) => item.status === 'Backlog')} key='backlog' />
                <Container id='inProgress' title='In Progress' issueList={issueData.filter((item) => item.status === 'In Progress')} key='inprogress' />
                <Container id='done' title='Done' issueList={issueData.filter((item) => item.status === 'Done')} key='done' />
            </div>
        </div>
    );
};
