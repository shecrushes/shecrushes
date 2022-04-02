import { NextPage } from "next";
import Link from 'next/link';
import { useState, useEffect, useRef, useContext } from 'react'
import { InView } from 'react-intersection-observer';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

// Hooks
import useWindowSize from '../../../hooks/useWindowSize'

// Component
import { 
    VideoTag,
    MainVideoLoader, 
    SkeletonLoader, 
    MobileShare, 
    BottomSheet
} from '../..';

// Lib
import { likeVideo } from "../../../lib/user/likeVideo";
import { unlikeVideo } from "../../../lib/user/unlikeVideo";

// Context
import AuthContext from '../../../context/AuthContext'

// Types
import type { frontPageVideo as video, likes } from '../../../common/types'

type advertisment = {
  title: string;
  device: string;
  zoneId: string;
}

type Props = {
    video: video;
    index: number;
    category: string;
    isMobileDevice: boolean;
    isSafari: boolean;

    // Volume
    toggleVolume: number;
    setToggleVolume: React.Dispatch<React.SetStateAction<number>>;

    // Likes
    likes: likes[];
    setLikes: React.Dispatch<React.SetStateAction<likes[]>>;

    // Comments
    showComments: boolean;
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleVideoMobile: NextPage<Props> = (props) => {
    const { user, userToken } = useContext(AuthContext)
    
    // Video state
    const videoRef = useRef<HTMLVideoElement>(null)
    const [videoIsInView, setVideoIsInView] = useState(false)
    const [isWaiting, setIsWaiting] = useState(false);

    // Hooks
    const [, windowHeight] = useWindowSize();

    // Video scroll hint
    const [userViewedScrollHint, setUserViewedScrollHint] = useState(false)
    const [showScrollHint, setShowScrollHint] = useState(false)
    const [idleTime, setIdleTime] = useState(0)

    // Video audio hint
    const [userViewedAudioHint, setUserViewedAudioHint] = useState(false)
    const [showAudioHint, setShowAudioHint] = useState(false)
    const [unMutedVideo, setUnMutedVideo] = useState(false)

    // User actions
    const [likeActive, setLikeActive] = useState(false)

    // Extra
    const [videoLikes, setVideoLikes] = useState(props.video.likes);

    // -------
    // Video
    // -------

    // If the react observer component returns true, that means the video
    // is in view and to play it, else pause the video.
    useEffect(() => {
        if (!videoRef.current) return;

        if (videoIsInView) {
            videoRef.current.play();

        } else {
            videoRef.current.pause();
        }
    }, [videoIsInView]);

    /**
     * Determines if video is buffering.
     * 
     * It first mounts 2 event listeners to the video reference. The "waiting" event listener
     * is fired when the video is buffering, when it runs it sets "setIsWaiting(true)"
     * 
     * The playing event listener runs when the video is no longer buffering, it then sets
     * "setIsWaiting(false)"
     *
     * @param {Ref} videoRef
     * @return {function(): void, function(): void} - unmounts event listeners
    */
    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        const waitingHandler = () => {
            setIsWaiting(true)
        };

        const playingHandler = () => {
            setIsWaiting(false)
        };

        // Add event listeners
        const element = videoRef.current;
        element.addEventListener("waiting", waitingHandler);
        element.addEventListener('playing', playingHandler);

        // clean up
        return () => {
            element.removeEventListener("waiting", waitingHandler);
            element.removeEventListener("playing", playingHandler);
        };
    }, [videoRef]);

    // -------
    // Audio Controls
    // -------

    // On every video change, mute the audio
    useEffect(() => {
        // If user hasn't already unmuted audio, then mute next video
        props.setToggleVolume(-1)
    }, [videoIsInView])

    /**
     * Toggles the audio on / off.
     * 
     * When toggleVolumeOnOff is called it first checks the previous value in state.
     * If the previous value is equal to the video index, that means audio is currently 
     * playing and to set it to -1 (this video index does not exist which mutes the audio)
     * 
     * However if prevVal is not equal to this current videos index, that means audio
     * is muted and therefore it will be set to this videos current index.
     *
     * @param {Ref} videoRef
     * @return {function(): void, function(): void} - unmounts event listeners
    */
    const toggleVolumeOnOff = (index: number) => {
        props.setToggleVolume((prevVal => prevVal === index ? -1 : index))
    }

    /**
     * If the user is idle and doesn't interact with any elements for 15 seconds, then
     * show the hint to scroll down
     *
     * @param {Boolean} viewedScrollHint
     * @return {Boolean} - returns true or false
    */
    useEffect(() => {

        //
        // Handle idle time
        //

        // Timer for amount of time user hasn't interacted with page
        const idleTimer = window.setInterval(() => {
            setIdleTime((prevVal) => prevVal + 1000)
        }, 1000);

        // If idle time is 10 seconds and user hasn't seen onboarding, then...
        if(idleTime >= 15000 && userViewedScrollHint === false) {
            setShowScrollHint(true)
        }

        //
        // Listen for user touch
        //

        // Called when user interacts with page
        const onFirstTouch = () => {
            // Hide scroll hint
            setShowScrollHint(false)

            // User viewed scroll hint
            setUserViewedScrollHint(true)

            // Change localstorage value
            localStorage.setItem('viewedOnboarding', 'true')    

            // Unmount 
            return () => {
                window.removeEventListener('touchstart', onFirstTouch, false);
                window.clearInterval(idleTimer);
            }
        }

        // This will listen for any human touch
        window.addEventListener("touchstart", onFirstTouch);

        // Unmount interval
        return () => {
            window.removeEventListener('touchstart', onFirstTouch, false);
            window.clearInterval(idleTimer);
        }
    }, [idleTime])

    // Get localstorage onboarding value
    useEffect(() => {
        const viewedOnboarding = localStorage.getItem('viewedOnboarding')

        if(viewedOnboarding === 'true') {
            setUserViewedScrollHint(true)
        } else {
            setUserViewedScrollHint(false)
        }
    }, [])

    /**
     * If the user doesn't toggle the volume after 2 videos, then show hint.
     *
     * @param {Boolean} viewedAudioHint
     * @return {Boolean} - returns true or false
    */
    useEffect(() => {
        // If user has scrolled to the third video and still has not toggled audio, then hint
        if(props.index >= 2 && props.toggleVolume === -1 && userViewedAudioHint === false) {
            setShowAudioHint(true)
        }

        // If the user has unmuted the video that means they know how to toggle audio
        if(unMutedVideo && userViewedAudioHint === false) {
            // Hide scroll hint
            setShowAudioHint(false)
    
            // User viewed scroll hint
            setUserViewedAudioHint(true)
    
            // Change localstorage value
            localStorage.setItem('viewedAudioOnboarding', 'true')    
        }
    }, [videoIsInView, unMutedVideo])

    // Get localstorage audio onboarding value
    useEffect(() => {
        const viewedAudioOnboarding = localStorage.getItem('viewedAudioOnboarding')
        
        if(viewedAudioOnboarding === 'true') {
            setUserViewedAudioHint(true)
            setShowAudioHint(false)
        } else {
            setUserViewedAudioHint(false)
        }
    }, [videoIsInView])


    // -------
    // Analytic events
    // -------


    // -------
    // Like video
    // -------
    const likeUnlikeVideo = async(videoId: string) => {
        if(!user) return notSignedIn();

        if(!likeActive) {
            // Push like to array
            const newLike = [{
                videoId
            }]
            
            // Update like state
            props.setLikes((likes) => [...likes, ...newLike]);
            setLikeActive(true)
            
            if(user.displayName) {
                // Make api call to like video           
                const likeVideoRes = likeVideo(videoId, userToken, user.displayName)
                likeVideoRequest(likeVideoRes)
    
                // Update like count
                setVideoLikes((prevVal) => prevVal + 1)
            }
        } else {
            // Remove like from array
            const result = props.likes.filter(like => like.videoId !== videoId);

            // Update like state
            props.setLikes(result);
            setLikeActive(false)

            // Make api call to unlike video
            const unlikeVideoRes = unlikeVideo(videoId, userToken)
            unlikeVideoRequest(unlikeVideoRes)

            // Update like count
            setVideoLikes((prevVal) => prevVal - 1)
        }
    }   

    // React toast
    const likeVideoRequest = (likeOperation: Promise<any>) => toast.promise(
        likeOperation,
        {
            loading: 'Loading',
            success: (data) => `Added to likes`,
            error: (err) => `Unable to add to likes`,
        },
        {
            // Styling
            className: 'bg-trueGray-800 text-medium text-trueGray-100',
            
            success: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },

            error: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },
        }
    );

    const unlikeVideoRequest = (likeOperation: Promise<any>) => toast.promise(
        likeOperation,
        {
            loading: 'Loading',
            success: (data) => `Removed from likes`,
            error: (err) => `Unable to remove from likes`,
        },
        {
            // Styling
            className: 'bg-trueGray-800 text-medium text-trueGray-100',
            
            success: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },

            error: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },
        }
    );

    const notSignedIn = () => toast('Please sign in to like a video', {
        duration: 3000,

        // Styling
        className: 'bg-trueGray-800 text-medium text-trueGray-100',
        
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

    // -------
    // Comments
    // -------
    const openComments = () => {       
        // Show comments
        props.setShowComments((prevVal) => !prevVal)
    }
    
    return (
        <InView 
            onChange={(inView) => setVideoIsInView(inView)} 
            tabIndex={0}
        >
            {/* Mobile video  h-screen w-screen*/}
            <div 
                className="relative text-center touch-none child group focus:outline-none"
                style={{height: `${windowHeight}px`}}
            >
                
                {/* Display loader while video is loading */}
                {isWaiting  ?
                    <div 
                        className="absolute h-full mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" 
                    >
                        <MainVideoLoader />
                    </div>
                    : 
                    null
                }

                {/* Main Video */}
                {!props.video.video_url ? 
                    <SkeletonLoader />
                    :
                    <video 
                        preload="none"
                        ref={videoRef}
                        loop 
                        autoPlay={false}
                        muted={props.toggleVolume === props.index ? false : true} // check if toggleVolume is equal to the item index, if it is, toggle volume
                        playsInline 
                        // className="object-cover w-full h-screen"
                        className="object-cover w-full"
                        data-cy="SingleMobileVideo"
                        poster={props.video.thumbnail}
                        style={{height: `${windowHeight}px`}}
                        onClick={() => {
                            toggleVolumeOnOff(props.index)
                            setUnMutedVideo(true)
                        }}
                    >
                        <source src={props.video.video_url} type="video/mp4"/>
                    </video>
                }       

                {/* Slight background for visibility */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 bg-gradient-to-t from-black"></div> */}

                {/* Video info absolute ${props.isSafari ? 'bottom-20' : 'bottom-12'} z-10 w-full px-5 py-4 mb-2*/} 
                <div className={`absolute bottom-0 z-10 w-full`}>
                    <div className="flex justify-between">
                        {/* Video Info */}
                        <div className="flex flex-col items-start w-3/4 px-5 pb-5">
                            {/* Video Tags */}
                            <div className="flex flex-wrap items-end mt-auto">
                                {props.video.tags.map((tag: string, index: number) => {
                                    return (
                                        <VideoTag 
                                            key={`${tag}:${props.video.id}${index}`}
                                            tag={tag}
                                            notFocusable={false}
                                        />
                                    )
                                })}
                            </div>

                            {/* Watch video button */}
                            <div className="flex-none mt-2">
                                <Link href={'/watch/' + props.video.id} passHref>
                                    <a className="no-underline" data-cy="WatchVideo">
                                        <div className="mt-1.5 rounded py-[6] px-[8px] bg-black">
                                            <p className="text-sm font-medium leading-7 text-white">
                                                Watch video
                                            </p>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        
                        {/* Video Actions Column */}
                        <div className="flex flex-col items-center pb-2 pr-0.5">
                            {/* Like Button */}
                            <div className="flex flex-col items-center cursor-pointer justify-center px-3.5 pt-2.5 bg-transparent border-0">
                                <motion.div
                                    className="-mb-1"
                                    onClick={() => likeUnlikeVideo(props.video.id)}
                                    variants={{
                                        rest: { scale: 1 },
                                        hover: { scale: 1 },
                                        pressed: { scale: 0.85 }
                                    }}
                                    initial="rest"
                                    whileHover="hover"
                                    whileTap="pressed"
                                >
                                    <span className="sr-only">Like video</span>     
                                    
                                    {/* Like icon */}
                                    <svg 
                                        className={`w-9 h-9 drop-shadow ${likeActive ? 'text-pink-500' : 'text-trueGray-100'}`}
                                        fill="currentColor" 
                                        viewBox="0 0 20 20" 
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                                    </svg>
                                </motion.div>
                                
                                {/* Number of likes */}
                                <p className="text-sm text-trueGray-50 pb-2.5">
                                    {videoLikes ? videoLikes : '0'}
                                </p>
                            </div>
                            
                            {/* Comment Button */}
                            <button
                                className="flex flex-col items-center cursor-pointer justify-center px-3.5 py-2.5 bg-transparent border-0"
                                data-cy="VideoComment" 
                                onClick={() => openComments()}
                            >
                                <span className="sr-only">Open comments</span>   
                                
                                {/* Comment icon */}  
                                <svg className="w-9 h-9 drop-shadow text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            

                            {/* Share Button */}
                            <div className="flex flex-col justify-center items-center px-3.5 py-2.5">
                                <span className="sr-only">Share video</span>     

                                <MobileShare id={props.video.id}/> 
                                <p className="pt-1 text-sm text-white">Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comment sheet */}
            <BottomSheet 
                videoId={props.video.id}
                showComments={props.showComments}
                setShowComments={props.setShowComments}

                // User
                userToken={userToken}
            />


            {/* Hint */}
            {showScrollHint ? 
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center object-cover object-center px-20 bg-transparent pointer-events-none bg-none">
                    <div className="flex flex-col justify-center object-cover object-center max-w-xs p-6 mx-auto bg-white rounded-md bg-opacity-20">
                        <div className="pt-5 mx-auto animate-bounce" style={{maxWidth: '100px'}}>
                            <svg 
                                className="text-white stroke-0"
                                height="100%" 
                                width="100%" 
                                fill="currentColor" 
                                viewBox="0 0 980.01 688.03" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="rotate(-90,417.01,427)">
                                    <g transform="matrix(-.1 0 0 -.1 999.99 511)">
                                        <path d="m1990.2 4579.6c-396.5-394.4-430.4-434.7-430.4-504.6 0-67.8 33.9-108.1 443.1-515.2 434.7-432.5 447.4-443.1 515.2-428.3 97.5 19.1 152.7 80.6 152.7 171.7 0 67.9-25.4 99.7-252.3 328.7l-254.4 254.4h720.9c534.3 0 707.28-12.762 797.19 24.563 114.5 57.3 125.09 220.03 19.113 293.54-72.699 50.425-74.2 42.4-788.8 42.4h-746.3l246 250.2c133.6 135.7 250.2 269.3 258.7 292.6 17 55.1-19.1 154.8-67.8 190.8-19.1 17-70 29.7-110.3 29.7-67.9-0.1-108.2-34-502.6-430.5z"></path><path d="m6919.9 4980.3c-57.2-42.4-82.7-131.5-57.2-197.2 10.6-33.9 127.2-167.5 258.7-296.8l237.5-239.6h-1477.9c-113.75-38.9-112.95-105.48-114.5-197.2 2.4252-76.674 33.825-101.07 59.225-124.47 40.3-40.3 72.175-28.226 784.58-34.626l746.3-6.4-252.3-252.3c-226.9-229-252.3-260.8-252.3-328.7 0-89.1 55.1-152.7 150.5-171.7 63.6-12.7 84.8 4.2 481.3 385.9 229 218.4 430.4 419.8 447.4 445.3 17 27.6 31.8 80.6 31.8 118.7 0 61.5-46.7 116.6-430.4 498.3-394.3 396.6-434.6 430.5-502.4 430.5-40.3 0-91.2-12.7-110.3-29.7z"></path><path d="m4613 4588.1c-172.67-27.874-461.9-261.13-468.6-504.7l-42.4-1577.5c-23.3-867.2-46.6-1619.9-53-1670.8l-12.7-93.3-103.9 165.4c-116.6 180.2-315.9 400.7-405 447.4-31.8 17-108.1 29.7-167.5 29.7-267.2 0-536.4-142.1-638.2-339.2-76.3-144.2-76.3-237.5 6.4-487.7 36-110.3 97.5-358.3 137.8-551.3 299-1422.7 527.9-1868 1443.9-2800.9l345.6-352v-360.4c0-267.1 8.5-388 33.9-474.9 110.2-373.2 396.5-659.4 771.8-769.7 163.3-50.9 1499.1-50.9 1687.7 0 358.3 93.3 619.1 335 746.3 695.5 48.8 137.8 55.1 186.6 63.6 606.4l8.5 455.9 59.4 95.4c93.3 144.2 205.7 402.9 313.8 720.9l99.7 286.2v1399.4c0 1378.2 0 1401.5-44.5 1496.9-63.6 133.6-167.5 246-292.6 311.7-93.3 48.8-134.69 76.537-289.49 76.537-178.1 0-187.61-21.337-274.51-91.337-48.8-38.2-89.1-65.7-93.3-63.6-2.1 4.2-14.8 86.9-29.7 184.5-57.2 409.2-273.5 623.4-631.8 623.4-118.8 0-180.2-10.6-271.4-53l-118.7-55.1-33.9 67.8c-70 133.6-159 224.8-288.4 288.4-167.5 84.8-330.8 89.1-515.2 12.7-70-29.7-133.6-53-142.1-53-10.6 0-17 417.7-17 928.7v926.6l-50.9 110.3c-63.6 133.6-190.8 260.8-326.5 324.4-106 50.6-203.59 68.838-407.1 44.3zm347.8-409.3 70-70 12.7-1070.7c8.5-589.4 14.9-1261.6 14.9-1494.8 0-356.2 6.4-432.5 33.9-472.8 50.9-74.2 125.1-93.3 209.9-59.4 89.1 38.2 103.9 84.8 148.4 500.4 21.2 180.2 48.8 328.7 65.7 356.2 110.3 171.7 436.8 197.2 506.8 40.3 17-38.2 59.4-258.7 95.4-491.9 57.2-388 67.9-428.3 118.7-470.7 72.1-63.6 165.4-63.6 231.1 4.2 50.9 48.8 53 61.5 53 347.7v294.7l65.7 55.1c120.9 101.8 364.7 59.4 434.7-76.3 23.3-42.4 46.7-176 63.6-356.2 17-156.9 48.8-400.7 72.1-538.6 48.8-290.5 84.8-352 205.7-352 108.1 0 165.4 70 195.1 237.5 53 303.2 146.3 483.4 252.3 483.4 82.7 0 190.8-63.6 237.5-137.8 40.3-67.9 42.4-101.8 42.4-1386.7v-1318.8l-86.9-269.3c-108.1-328.7-205.7-549.2-311.7-691.2l-78.5-108.1-10.6-519.5c-10.6-515.2-10.6-519.5-70-640.3-76.3-154.8-252.3-318-400.7-371.1-101.8-33.9-186.6-38.2-843.9-36.1-714.5 0-733.6 2.1-856.6 50.9-167.5 63.6-309.6 205.7-373.2 373.2-46.7 114.5-50.9 165.4-59.4 578.9l-8.5 455.9-364.7 360.4c-371.1 368.9-638.2 680.6-824.8 966.8-250.1 383.9-379.5 761.4-576.6 1685.8-42.4 199.3-106 447.4-139.9 553.4-74.2 235.4-78.4 324.4-12.7 385.9 55.1 50.9 146.3 89 216.3 89 112.4 0 330.8-265 477.1-581 70-148.4 95.4-239.6 139.9-502.5 55.1-330.8 99.6-458 182.3-515.3 72.1-50.9 171.7-42.4 229 19.1l50.9 53 61.5 2200.8c33.9 1208.6 70 2234.8 80.6 2277.2s53 112.4 91.2 154.8c63.6 65.7 82.7 74.2 182.3 74.2 95.3 0.2 118.6-8.3 178-67.7z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="pt-4 text-sm font-semibold tracking-wide text-center text-white">
                            Swipe down to see the next video
                        </div>
                    </div>
                </div>
                : 
                null
            }

            {/* Audio Hint */}
            {showAudioHint ? 
                <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center object-cover object-center px-20 bg-transparent pointer-events-none bg-none">
                    <div className="flex flex-col justify-center object-cover object-center max-w-xs p-6 mx-auto bg-white rounded-md bg-opacity-20">
                        <div className="pt-5 mx-auto" style={{maxWidth: '120px'}}>
                            <svg className="ml-3 text-white stroke-0" height="100%" width="100%" fill="currentColor" viewBox="0 0 980.01 1088.03" xmlns="http://www.w3.org/2000/svg">
                                <g transform="rotate(360,417.01,427)">
                                    <g transform="matrix(-.1 0 0 -.1 999.99 511)">
                                        <path d="m4613 4588.1c-172.67-27.874-461.9-261.13-468.6-504.7l-42.4-1577.5c-23.3-867.2-46.6-1619.9-53-1670.8l-12.7-93.3-103.9 165.4c-116.6 180.2-315.9 400.7-405 447.4-31.8 17-108.1 29.7-167.5 29.7-267.2 0-536.4-142.1-638.2-339.2-76.3-144.2-76.3-237.5 6.4-487.7 36-110.3 97.5-358.3 137.8-551.3 299-1422.7 527.9-1868 1443.9-2800.9l345.6-352v-360.4c0-267.1 8.5-388 33.9-474.9 110.2-373.2 396.5-659.4 771.8-769.7 163.3-50.9 1499.1-50.9 1687.7 0 358.3 93.3 619.1 335 746.3 695.5 48.8 137.8 55.1 186.6 63.6 606.4l8.5 455.9 59.4 95.4c93.3 144.2 205.7 402.9 313.8 720.9l99.7 286.2v1399.4c0 1378.2 0 1401.5-44.5 1496.9-63.6 133.6-167.5 246-292.6 311.7-93.3 48.8-134.69 76.537-289.49 76.537-178.1 0-187.61-21.337-274.51-91.337-48.8-38.2-89.1-65.7-93.3-63.6-2.1 4.2-14.8 86.9-29.7 184.5-57.2 409.2-273.5 623.4-631.8 623.4-118.8 0-180.2-10.6-271.4-53l-118.7-55.1-33.9 67.8c-70 133.6-159 224.8-288.4 288.4-167.5 84.8-330.8 89.1-515.2 12.7-70-29.7-133.6-53-142.1-53-10.6 0-17 417.7-17 928.7v926.6l-50.9 110.3c-63.6 133.6-190.8 260.8-326.5 324.4-106 50.6-203.59 68.838-407.1 44.3zm347.8-409.3 70-70 12.7-1070.7c8.5-589.4 14.9-1261.6 14.9-1494.8 0-356.2 6.4-432.5 33.9-472.8 50.9-74.2 125.1-93.3 209.9-59.4 89.1 38.2 103.9 84.8 148.4 500.4 21.2 180.2 48.8 328.7 65.7 356.2 110.3 171.7 436.8 197.2 506.8 40.3 17-38.2 59.4-258.7 95.4-491.9 57.2-388 67.9-428.3 118.7-470.7 72.1-63.6 165.4-63.6 231.1 4.2 50.9 48.8 53 61.5 53 347.7v294.7l65.7 55.1c120.9 101.8 364.7 59.4 434.7-76.3 23.3-42.4 46.7-176 63.6-356.2 17-156.9 48.8-400.7 72.1-538.6 48.8-290.5 84.8-352 205.7-352 108.1 0 165.4 70 195.1 237.5 53 303.2 146.3 483.4 252.3 483.4 82.7 0 190.8-63.6 237.5-137.8 40.3-67.9 42.4-101.8 42.4-1386.7v-1318.8l-86.9-269.3c-108.1-328.7-205.7-549.2-311.7-691.2l-78.5-108.1-10.6-519.5c-10.6-515.2-10.6-519.5-70-640.3-76.3-154.8-252.3-318-400.7-371.1-101.8-33.9-186.6-38.2-843.9-36.1-714.5 0-733.6 2.1-856.6 50.9-167.5 63.6-309.6 205.7-373.2 373.2-46.7 114.5-50.9 165.4-59.4 578.9l-8.5 455.9-364.7 360.4c-371.1 368.9-638.2 680.6-824.8 966.8-250.1 383.9-379.5 761.4-576.6 1685.8-42.4 199.3-106 447.4-139.9 553.4-74.2 235.4-78.4 324.4-12.7 385.9 55.1 50.9 146.3 89 216.3 89 112.4 0 330.8-265 477.1-581 70-148.4 95.4-239.6 139.9-502.5 55.1-330.8 99.6-458 182.3-515.3 72.1-50.9 171.7-42.4 229 19.1l50.9 53 61.5 2200.8c33.9 1208.6 70 2234.8 80.6 2277.2s53 112.4 91.2 154.8c63.6 65.7 82.7 74.2 182.3 74.2 95.3 0.2 118.6-8.3 178-67.7z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="pt-4 text-sm font-semibold tracking-wide text-center text-white">
                            Tap the video to toggle audio
                        </div>
                    </div>
                </div>
                : 
                null
            }
        </InView>
    )
}

export default SingleVideoMobile