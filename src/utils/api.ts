export const mockFetchIssues = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            import('../data/issues.json').then(module => resolve(module.default));
        }, 500);
    });
};

export const mockFetchIssueWithId = (id: string) => {
     return new Promise(resolve => {
        setTimeout(() => {
            import('../data/issues.json').then(module => {
                const issueData = module.default.filter((item) => item.id === id);
                resolve(issueData.length === 0 ? null : issueData[0]);
            });
        }, 500);
    });
}

export const mockUpdateIssue = (issueId: string, updates: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.9) {
                resolve({id: issueId, ...updates});
            } else {
                reject(new Error('Failed to update issue'));
            }
        }, 500);
    });
};
