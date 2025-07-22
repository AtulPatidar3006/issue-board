import React, { FC, useMemo, useRef } from 'react';
import { Issue } from '../types';
import { useNavigate } from 'react-router-dom';
import { useIssueContext } from '../utils/issueContext';
import { toast } from 'react-toastify';

interface CardProps {
    issue: Issue,
}

export const IssueCard: FC<CardProps> = ({ issue }) => {
    const navigate = useNavigate();
    const { issueData, setIssueData } = useIssueContext();

    const originalIssueforUndoRef = useRef<Issue | null>(null);

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

    // function to update state after undo
    const handleUndo = () => {
        if (originalIssueforUndoRef.current) {
            const updatedIssueData = JSON.parse(JSON.stringify(issueData));
            updatedIssueData.forEach((eachItem: Issue) => {
                if (originalIssueforUndoRef.current !== null && eachItem.id === originalIssueforUndoRef.current.id) {
                    eachItem.status = originalIssueforUndoRef.current.status;
                    originalIssueforUndoRef.current = null;
                }
            });
            setIssueData(updatedIssueData);
        }
    }

    // to show undo popup
    const notify = () => toast(<div style={{ width: '100%' }}>
        <button className='undo-button' onClick={handleUndo}> Click here if you want to undo.</button>
    </div>);

    // handle click on issue card
    const handleIssueCardClick = () => {
        navigate(`/issue/${issue.id}`);

        try {
            const currentDataInLocalStorage = localStorage.getItem('recentlyAccessed')
            if (currentDataInLocalStorage === null) {
                localStorage.setItem('recentlyAccessed', issue.id);
            } else if (currentDataInLocalStorage.split(',').indexOf(issue.id) === -1) {
                const currentValueArray = currentDataInLocalStorage.split(',');
                currentValueArray.unshift(issue.id);
                if (currentValueArray.length > 5) {
                    localStorage.setItem('recentlyAccessed', currentValueArray.slice(0, 5).join());
                } else {
                    localStorage.setItem('recentlyAccessed', currentValueArray.join());
                }
            }
        } catch (error) {
            localStorage.setItem('recentlyAccessed', '');
        }
    }

    // function to move issue to right column
    const handleMoveRight = () => {
        // to create a copy of original state
        const updatedIssueData = JSON.parse(JSON.stringify(issueData));
        updatedIssueData.forEach((eachItem: Issue) => {
            if (eachItem.id === issue.id) {
                originalIssueforUndoRef.current = { ...eachItem };
                eachItem.status = eachItem.status === 'Backlog' ? 'In Progress' : 'Done';
            }
        });
        notify();
        setTimeout(() => {
            setIssueData(updatedIssueData);
        }, 500);
    }

    // function to move issue to left column
    const handleMoveLeft = () => {
        // to create a copy of original state
        const updatedIssueData = JSON.parse(JSON.stringify(issueData));
        updatedIssueData.forEach((eachItem: Issue) => {
            if (eachItem.id === issue.id) {
                originalIssueforUndoRef.current = { ...eachItem };
                eachItem.status = eachItem.status === 'Done' ? 'In Progress' : 'Backlog';
            }
        });
        notify();
        setTimeout(() => {
            setIssueData(updatedIssueData);
        }, 500);
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