/**
 * 
 * Determine if video index is a multiple of 5, if it is, render a randomized
 * advertisment
 *
 *  This means that every 5 videos, we render an ad.
 * 
 * @param {index} videoIndex
 * @return {boolean}
*/
export function isIndexAMultipleOf(videoIndex: number) {
    // Return the remainder left over by diving videoIndex by 4
    let index = videoIndex % 4

    // If index is zero that means videoIndex is a multiple of 5, return true
    let value;
    if(index == 0 && videoIndex !== 0) {
        value = true;
    } else { 
        value = false
    }

    return value
}