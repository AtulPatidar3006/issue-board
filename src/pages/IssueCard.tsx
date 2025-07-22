import React, { FC, useMemo } from 'react';
import { Issue } from '../types';
import { useNavigate } from 'react-router-dom';
import { useIssueContext } from '../utils/issueContext';

interface CardProps {
    issue: Issue,
}

export const IssueCard: FC<CardProps> = ({ issue }) => {
    const navigate = useNavigate();
    const { issueData, setIssueData } = useIssueContext();

    // to set card style based on column
    const issueColumnClass = useMemo(() => {
        if (issue.status === 'Backlog') {
            return 'backlog';
        }
        if (issue.status === 'In Progress') {
            return 'inprogress';
        }
        if (issue.status === 'Done') {
            return 'done';
        }
        return '';
    }, [issue.status])

    const issuePriorityClass = useMemo(() => {
        if (issue.priority === 'high') {
            return 'priority-high';
        }
        if (issue.priority === 'medium') {
            return 'priority-medium';
        }
        if (issue.priority === 'low') {
            return 'priority-low';
        }
        return '';
    }, [issue.priority])

    const handleIssueCardClick = () => {
        navigate(`/issue/${issue.id}`)
    }

    const handleMoveRight = () => {
        // to create a copy of original state
        const updatedIssueData = JSON.parse(JSON.stringify(issueData));
        updatedIssueData.forEach((eachItem: Issue) => {
            if (eachItem.id === issue.id) {
                eachItem.status = eachItem.status === 'Backlog' ? 'In Progress' : 'Done';
            }
        })
        setTimeout(() => {
            setIssueData(updatedIssueData);
        }, 500)
    }

    const handleMoveLeft = () => {
        // to create a copy of original state
        const updatedIssueData = JSON.parse(JSON.stringify(issueData));
        updatedIssueData.forEach((eachItem: Issue) => {
            if (eachItem.id === issue.id) {
                eachItem.status = eachItem.status === 'Done' ? 'In Progress' : 'Backlog';
            }
        })
        setTimeout(() => {
            setIssueData(updatedIssueData);
        }, 500)
    }

    return (
        <div className={`issue-card ${issueColumnClass}`}>
            <div className='tags'>
                {
                    issue.tags.map((tag) => (
                        <span key={tag}>{tag.toUpperCase()}</span>
                    ))
                }
            </div>
            <table className='issue-detials-table' onClick={() => handleIssueCardClick()}>
                <tbody>
                    <tr>
                        <td className='issue-field'>Title</td>
                        <td>:</td>
                        <td>{issue.title}</td>
                    </tr>
                    {/* <tr>
                        <td className='issue-field'>Status</td>
                        <td>{issue.status}</td>
                    </tr> */}
                    <tr>
                        <td className='issue-field'>Priority</td>
                        <td>:</td>
                        <td className={issuePriorityClass}>{issue.priority.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Severity</td>
                        <td>:</td>
                        <td>{issue.severity}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Created On</td>
                        <td>:</td>
                        <td>{new Date(issue.createdAt).toDateString()}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Assignee</td>
                        <td>:</td>
                        <td>{issue.assignee.toUpperCase()}</td>
                    </tr>
                    {/* <tr>
                        <td className='issue-field'>Tags</td>
                        <td>{issue.tags.join()}</td>
                    </tr> */}
                </tbody>
            </table>
            <div className='action-buttons'>
                <button disabled={issue.status === 'Backlog'} id='previous-btn' onClick={() => handleMoveLeft()}>{'<'}</button>
                <button disabled={issue.status === 'Done'} id='next-btn' onClick={() => handleMoveRight()}>{'>'}</button>
            </div>
        </div>
    );
}