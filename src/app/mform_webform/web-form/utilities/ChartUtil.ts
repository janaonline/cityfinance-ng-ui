export const getToolTipTitleForGroupedBar = (tooltipItems, data: { labels: [], datasets: { data: any }[] }) => {
    let indexMouseHoveredOver = tooltipItems[0].datasetIndex;
    const bar = data.datasets[indexMouseHoveredOver];
    const label = data.labels[tooltipItems[0].index];
    return `${bar['label']} (${label})`;
};

export const handlePieChartColor = (length) => {
    return [
        '#899ee7',
        '#3a82d2',
        '#75b6d2',
        '#61c478',
        '#4da337',
        '#8a8a33',
        '#ee7c3b',
        '#cf4f84',
        '#ba6dcd',
        '#9469cd',
        '#8b79eb',
        '#3a82d2',
        '#75b6d2',
        '#61c478',
        '#4da337',
        '#8a8a33',
        '#ee7c3b',
        '#cf4f84',
        '#ba6dcd',
        '#9469cd',
        '#8b79eb',
    ];
};
