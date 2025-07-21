import React, { FC, Suspense } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Issue } from '../types';
import { IssueCard } from './IssueCard';

interface ContainerProps {
    id: string,
    title: string,
    issueList: Issue[],
}

export const Container: FC<ContainerProps> = ({ id, issueList, title }) => {
    const { setNodeRef } = useDroppable({
        id,
    });

    return (
        <div className='container'>
            <h3>{title}</h3>
            <br />
            <div className='card-container' ref={setNodeRef}>
                {
                    issueList.map((issueItem) => (
                        <IssueCard key={issueItem.id} issue={issueItem} />
                    ))
                }
            </div>
        </div>
    )
};