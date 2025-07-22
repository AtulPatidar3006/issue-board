import { Issue } from "../types"

const calculatePriorityScore = (severity: number, createdDate: string, definedRank: number) => {
    const diffInMilliseconds = Math.abs(new Date().getTime() - new Date(createdDate).getTime());
    const millisecondsInADay = 1000 * 60 * 60 * 24;

    const daysSinceCreated = Math.round(diffInMilliseconds / millisecondsInADay);

    const priorityScore = severity * 10 + (daysSinceCreated * -1) + definedRank;
    return priorityScore;
}

export const sortingFuntion = (list: Issue[], sortType: string) => {
    const updatedListWithPriorityScore = JSON.parse(JSON.stringify(list));
    updatedListWithPriorityScore.sort((a: Issue, b: Issue) => {
        const priorityScoreA = calculatePriorityScore(a.severity, a.createdAt, 1);
        const priorityScoreB = calculatePriorityScore(b.severity, b.createdAt, 1);

        if(priorityScoreA != priorityScoreB){
            return sortType === 'high' ?  priorityScoreA - priorityScoreB : priorityScoreB - priorityScoreA;
        }

        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return sortType === 'high' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    })
    return updatedListWithPriorityScore;
}