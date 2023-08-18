export const getDaysDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2 - date1);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

export const isValidDate = d => {
    return d instanceof Date && !isNaN(d as any);
}  