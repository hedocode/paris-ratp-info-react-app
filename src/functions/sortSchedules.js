function sortSchedules(a, b) {
    // Handle Error case
    if(!isNaN(parseInt(a))) {
        return -1;
    }
    if(!isNaN(parseInt(b))) {
        return 1;
    }

    const parsedTimeA = parseInt(a.message.split(" ")[0]);
    const parsedTimeB = parseInt(b.message.split(" ")[0]);

    // Handler non minutes messages
    if(isNaN(parsedTimeA)) {
        return -1;
    }

    if (isNaN(parsedTimeB)) {
        return 1;
    }

    // Simple sort based on minutes
    if(parsedTimeA === parsedTimeB) {
        return 0;
    } else return parsedTimeA > parsedTimeB ? 1 : -1;
}

export default sortSchedules;