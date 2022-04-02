/**
 * 
 * When called, this function will match the user agent with known mobile devices. It
 * will then return a boolean value as to weather the device is mobile or not.
 * 
 * @param {userAgent} string
 * @return {boolean} - Returns true/false if device is mobile
*/
export function detectMobileDevice(userAgent: string) {

    // Match the useragent with known mobile devices
    const isMobileDevice = Boolean(userAgent?.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))

    return isMobileDevice
}