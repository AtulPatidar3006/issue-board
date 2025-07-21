import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { mockFetchIssueWithId, mockUpdateIssue } from '../utils/api';
import { Issue } from '../types';
import { useIssueContext } from '../utils/issueContext';
import './IssueDetailsPage.css';

export const IssueDetailPage = () => {
    const { id } = useParams();
    const { issueData } = useIssueContext();
    const [issueDetail, setIssueDetail] = useState<Issue | null>(null);

    useEffect(() => {
        const issue = issueData.filter((item) => item.id === id);
            setIssueDetail(issue.length === 0 ? null : issue[0]);
    }, [])

    console.log(issueDetail);

    const issueColumnClass = useMemo(() => {
        if (issueDetail === null) {
            return '';
        }
        if (issueDetail.status === 'Backlog') {
            return 'backlog';
        }
        if (issueDetail.status === 'In Progress') {
            return 'inprogress';
        }
        if (issueDetail.status === 'Done') {
            return 'done';
        }
        return '';
    }, [issueDetail])

    const issuePriorityClass = useMemo(() => {
        if (issueDetail === null) {
            return '';
        }
        if (issueDetail.priority === 'high') {
            return 'priority-high';
        }
        if (issueDetail.priority === 'medium') {
            return 'priority-medium';
        }
        if (issueDetail.priority === 'low') {
            return 'priority-low';
        }
        return '';
    }, [issueDetail])

    const handleMarkAsResolved = () => {
        const updatedObject = {...issueDetail, status: 'Done' }
        mockUpdateIssue(id as string, updatedObject).then((response) => {
            debugger;
            setIssueDetail(response as Issue);
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <div className='issue-detail-container'>
            <table className='issue-detail-table'>
                <tbody>
                    <tr>
                        <td className='issue-field'>Title</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : issueDetail.title}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Priority</td>
                        <td>:</td>
                        <td className={`issue-field-value ${issuePriorityClass}`}>{issueDetail === null ? '' : issueDetail.priority.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Severity</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : issueDetail.severity}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Status</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : issueDetail.status}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Created On</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : new Date(issueDetail.createdAt).toDateString()}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Assignee</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : issueDetail.assignee.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className='issue-field'>Tags</td>
                        <td>:</td>
                        <td className='issue-field-value'>{issueDetail === null ? '' : issueDetail.tags.join()}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <br />
            <button disabled={issueDetail !== null && issueDetail.status === 'Done'} className='resolved-button' onClick={() => handleMarkAsResolved()}>Mark As Resolved</button>
        </div>
    );
};
