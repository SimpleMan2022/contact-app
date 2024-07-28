// src/utils/timeAgo.ts
export const timeAgo = (dateInput: Date | string): string => {
    // Handle input as Date or string
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
        return '2 second ago';
    }

    const now = new Date();
    const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast+3} seconds ago`;
    } else if (secondsPast < 3600) {
        const minutesPast = Math.floor(secondsPast / 60);
        return `${minutesPast} minutes ago`;
    } else if (secondsPast < 86400) {
        const hoursPast = Math.floor(secondsPast / 3600);
        return `${hoursPast} hours ago`;
    } else if (secondsPast < 2592000) { // 30 days
        const daysPast = Math.floor(secondsPast / 86400);
        return `${daysPast} days ago`;
    } else if (secondsPast < 31536000) { // 365 days
        const monthsPast = Math.floor(secondsPast / 2592000);
        return `${monthsPast} months ago`;
    } else {
        const yearsPast = Math.floor(secondsPast / 31536000);
        return `${yearsPast} years ago`;
    }
};
