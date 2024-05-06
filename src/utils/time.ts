/**
 * Calculates the number of minutes from a given time in seconds.
 *
 * @param {number} trainingTime - The time in seconds.
 * @returns {number} The number of minutes.
 */
export function getMinutes(trainingTime: number): number {
    return Math.floor(trainingTime / 60);
}

/**
 * Calculates the remaining number of seconds after extracting minutes from a given time in seconds.
 *
 * @param {number} trainingTime - The time in seconds.
 * @returns {number} The remaining number of seconds.
 */
export function getRemainingSeconds(trainingTime: number): number {
    return trainingTime % 60;
}

/**
 * Converts a given time in seconds into a formatted string of minutes and seconds.
 *
 * @param {number} trainingTime - The time in seconds.
 * @returns {string} The time formatted as minutes and seconds.
 */
export function getMinutesAndSeconds(trainingTime: number): string {
    const minutes = getMinutes(trainingTime);
    const seconds = getRemainingSeconds(trainingTime);
    return `${minutes}m ${seconds}s`;
}