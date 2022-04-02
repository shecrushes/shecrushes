import AllAds from '../components/AdSpace/ExoClick/AllAds';

/**
 * 
* When called, this function will get all the ads that match the provided
* category and device. It will then take these ads and choose a random one
* and return it.
 * 
 * @param {category} string
 * @param {device} string
 * @return {object} - Returns the advertisment object
*/
export function getAdvertisment(category: string, deviceIsMobile: boolean, getCommentAd?: boolean) {
    let currentDevice = ''
    let foundAds = []

    // Set mobile status
    if(deviceIsMobile) {
        currentDevice = 'Mobile'
    } else {
        currentDevice = 'Desktop'
    }
    
    // Loop through all ads and match ads based on the category and current device. 
    for (const ad in AllAds) {
        const categoryTitle = AllAds[ad].title
        const device = AllAds[ad].device
        const comments =  AllAds[ad]?.comments;

        // Only match ads with the current category & device
        if((categoryTitle.toLowerCase() === category.toLowerCase()) && (device === currentDevice) && (getCommentAd !== true)) {
            foundAds.push(AllAds[ad])
        } else if ((categoryTitle.toLowerCase() === category.toLowerCase()) && (device === currentDevice) && (getCommentAd === comments)) {
            foundAds.push(AllAds[ad])
        }
    }

    // Return advertisment
    return foundAds[0]
}