export const convertTimeToString = (minutes: number): string => {
    const hours = Math.floor(minutes / 60) + 'h';
    const remainingMinutes = minutes % 60;
    if (hours === '0h') {
        return `${remainingMinutes} min`;
    }
    if (remainingMinutes === 0) {
        return hours;
    } else {
        return `${hours}${remainingMinutes}`;
    }
};
