import React, { useEffect, useState } from 'react';
import './RecentlyVisited.css';
import { Issue } from '../types';
import { useNavigate } from 'react-router-dom';
import { useIssueContext } from '../utils/issueContext';

export const RecentlyVisited = () => {
    const navigate = useNavigate();
    const { issueData } = useIssueContext();
    const [dataToDisplay, setDataToDisplay] = useState<Issue[]>([]);

    const dataFromLocalStorage = localStorage.getItem('recentlyAccessed');

    useEffect(() => {
        if (dataFromLocalStorage !== null) {
            const localDataArray = dataFromLocalStorage?.split(',');
            const issueDataForRecetlyVisited = issueData.filter((eachIssue) => localDataArray?.indexOf(eachIssue.id) !== -1);
            setDataToDisplay(issueDataForRecetlyVisited);
        }
    }, [dataFromLocalStorage])

    if (dataFromLocalStorage === null) {
        return null;
    }

    const handleIssueItemClick = (id: string) => {
        navigate(`/issue/${id}`);
    }

    return (
        <div className='recently-visited-container'>
            <div className='recently-visited-title'>Recently Visited</div>
            {
                dataToDisplay.map((eachItem) => (
                    <div key={eachItem.id} className='recently-visited-item' onClick={() => handleIssueItemClick(eachItem.id)}>{eachItem.title}</div>
                ))
            }
        </div>
    )
}