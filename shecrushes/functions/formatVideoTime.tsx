/**
 * 
 * The minutes are calculated by first dividing the video duration by 60 and returning the remainder.
 * Then we subtract the duration by the remainder returned
 * 
 * The seconds are calculated by taking the remainder when dividing roundedDuration by 60 seconds
 *
 *  
 * 
 * @param {number} roundedDuration
 * @return {string} formatted
*/
export function formatVideoTime(roundedDuration: number) {
    const minutes = ((roundedDuration - (roundedDuration % 60)) / 60) % 60;
    const seconds = roundedDuration % 60;
    let formatted = `${minutes}:${seconds}`

    // If seconds are between 60 - 69, the remainder will be 0 and the seconds will only
    // have 1 number instead of ie(1:0 instead of 1:00)
    if(roundedDuration >= 60 && roundedDuration <= 69) {
        formatted = `${minutes}:0${seconds}`;
    } else if (roundedDuration >= 0 && roundedDuration <= 9) {
        formatted = `${minutes}:0${seconds}`;
    }

    return formatted 
}