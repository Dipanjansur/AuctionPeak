const formatTimeDifference = (ms) => {
    if (ms < 0) ms = -ms;
    // const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 30);
    const months = Math.floor((ms / (1000 * 60 * 60 * 24 * 30)));

    let parts = [];
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    // if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(' ') : "0 seconds";
};

module.exports = { formatTimeDifference };
