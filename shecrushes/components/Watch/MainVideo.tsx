import { NextPage } from "next";
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { Disclosure } from '@headlessui/react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Range, getTrackBackground } from 'react-range';

// Components
import { MainVideoLoader } from '..'

// Functions
import { formatVideoTime } from '../../functions/formatVideoTime'

// Types
import type { watchVideo as video } from '../../common/types'

interface Props {
    video: video;
    isMobileDevice: boolean
}

const MainVideo: NextPage<Props> = (props) => {
    const env = process.env.NEXT_PUBLIC_ENV;
    const handle = useFullScreenHandle();

    // Video
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoFullScreen = useRef<HTMLDivElement>(null)
    const [videoSrc, setVideoSrc] = useState(props.video.video_sd);
    const [videoProgress, setVideoProgress] = useState([0]);
    const [videoCurrentTime, setVideoCurrentTime] = useState('0:00');
    const [playing, setPlaying] = useState(false)
    const [audioRange, setAudioRange] = useState(1)
    const [audioRangeForSlider, setAudioRangeForSlider] = useState('100')
    const [videoDuration, setVideoDuration] = useState('0:00')
    const [videoQualityDropdown, setVideoQualityDropdown] = useState(false)
    const [videoQuality, setVideoQuality] = useState('480p')

    // Video loader & bar
    const [isWaiting, setIsWaiting] = useState(false);
    const [showVideoBar, setShowVideoBar] = useState(true)
    const [mouseInView, setMouseInView] = useState(false)
    const timerRef = useRef<number | null>(null);
    
    /**
     * Determines the videos width and height in relation to the current windows dimensions
     * 
     *
     * @param {number} videoRef.current.duration
     * @return {string}
    */
    

    /**
     * Gets the current video total time length, then converts it to a number and rounds it to 
     * first decimal place. Then passes it to format function
     * 
     *
     * @param {number} videoRef.current.duration
     * @return {string}
    */
    useEffect(() => {
        const duration = videoRef.current && videoRef.current.duration

        if(duration) {
            const roundedDuration = Number(duration.toFixed(0))
            const formattedTime = formatVideoTime(roundedDuration)

            // Sets the current video duration for the video bar
            setVideoDuration(formattedTime)
        }

    }, [videoRef.current && videoRef.current.duration])

    /**
     * Gets the current video current time, then converts it to a number and rounds it to 
     * first decimal place. Then passes it to format time function.
     * 
     *
     * @param {number} videoRef.current.duration
     * @return {string}
    */
    useEffect(() => {
        const currentTime = videoRef.current && videoRef.current.currentTime

        if(currentTime) { 
            const roundedDuration = Number(currentTime.toFixed(0))
            const formattedTime = formatVideoTime(roundedDuration)

            // Sets the current video time for the video bar
            setVideoCurrentTime(formattedTime)
        }
    }, [videoRef.current && videoRef.current.currentTime])

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

    /**
     * Calculates the current video time to render the progress bar.
     * 
     * It takes the current video time and divides it by the duration, it then multiplies by 100
     * to get a full number
     * 
     * @return {[number]}
    */
    const handleProgressBar = () => {
        if(videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setVideoProgress([progress])
        }
    }

    /**
     * Calculates the current video time to render the progress bar.
     * 
     * It takes the current video time and divides it by the duration, it then multiplies by 100
     * to get a full number
     * 
     * @return {[number]}
    */
    const handleVideoEnd = () => {
        if(videoRef.current) {
            // Show videobar and restart overlay
            setShowVideoBar(true);
            videoRef.current.play()
        }
    }

    /**
     * Handles user video seeking
     * 
     * Based on the users manual change (the value passed to the function), we set the videos current
     * time to calculated duration.
     * 
     * Then we set the progress bar with the same calculated value.
     * 
     * @param {[number]} 
     * @return {[number]}
    */
    const handleVideoSeek = (values: number[]) => {
        const manualChange = values[0]
        
        if(videoRef.current) {
            videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;

            const progress = videoRef.current.currentTime / videoRef.current.duration * 100
            setVideoProgress([progress])
        }
    };


    /**
     * Toggles playing icon
     * 
     * Toggle playing function starts or pauses the video based on the 'playing' state
     * 
     * @param {boolean} 
     * @return play() or pause()
    */
    const togglePlaying = 
    (value: boolean, fromKeyBoard: boolean, e?: KeyboardEvent<HTMLDivElement>) => {
        if(e?.code === 'Enter' && fromKeyBoard) {
            // Keep video bar in view
            setShowVideoBar(true);

            // Set icon
            setPlaying(value)

            // Play video
            if(!playing) {
                videoRef.current && videoRef.current.play()
            } else {
                videoRef.current && videoRef.current.pause()
            }
        } 

        if(e?.code !== 'Tab') {
            // Keep video bar in view
            setShowVideoBar(true);

            // Set icon
            setPlaying(value)

            // Play video
            if(!playing) {
                videoRef.current && videoRef.current.play()
            } else {
                videoRef.current && videoRef.current.pause()
            } 
        }
    }

    /**
     * Toggles audio
     * 
     * This function toggles the audio of the actual video based on the icons clicked (mute or not)
     * 
     * @param {boolean} 
     * @return {string}
    */
    const toggleAudio = (e?: KeyboardEvent<HTMLDivElement>) => {
        if(audioRange === 1 && e?.code !== 'Tab') { // if audio is max and user clicks icon, then mute audio
            // Change icon
            setAudioRange(0)

            // Set video audio
            if(videoRef.current) {
                videoRef.current.volume = 0;
            }

            // Set string for audio slider
            setAudioRangeForSlider('0')
        } else if (audioRange === 0 && e?.code !== 'Tab') { // if audio is muted and user clicks icon, play audio
            // Change icon
            setAudioRange(1)

            // Set video audio
            if(videoRef.current) {
                videoRef.current.volume = 1;
            }

            // Set string for audio slider
            setAudioRangeForSlider('100')
        } else { // if audio is not 0 and not 100, then mute audio
            // Change icon
            setAudioRange(0)

            // Set video audio
            if(videoRef.current) {
                videoRef.current.volume = 0;
            }

            // Set string for audio slider
            setAudioRangeForSlider('0')
        }
    }

    /**
     * Handles the audio range for the slider
     * 
     * This function handles the audio range based on the users slider input.
     * It's based an HTMLInputElement event, from there it is parsed to a number that will be between
     * 0 - 1 (min or max). This will be the value that will set the actual videos audio
     * 
     * The normal event target value is then set for the slider (a value between 0-100)
     * 
     * @param {HTMLInputElement} 
     * @return {string}
    */
    const handleAudioRange = (event: ChangeEvent<HTMLInputElement>) => {
        // Calculate audio number for video
        const vol = Number(event.target.value) * 0.01
        setAudioRange(vol)

        // Set video audio
        if(videoRef.current) {
            videoRef.current.volume = vol;
        }

        // Set string for audio slider
        setAudioRangeForSlider(event.target.value)
    }

    // Handle video quality change
    const handleQualityChange = (val: string, e?: KeyboardEvent<HTMLLIElement>) => {
        if(val === '480p' && e?.code !== 'Tab') {
            setVideoSrc(props.video.video_sd)
            setVideoQuality('480p')
            setVideoQualityDropdown(false)

        } 

        if(val === '1080p' && e?.code !== 'Tab') {
            setVideoSrc(props.video.video_hd)
            setVideoQuality('1080p')
            setVideoQualityDropdown(false)
        }
    }

    // Quality dropdown
    const handleQualityDropdown = (e?: KeyboardEvent<HTMLSpanElement>) => {
        if(e?.code !== 'Tab') {
            setVideoQualityDropdown((val) => !val)
        }
    }

    // Full screen
    const handleFullScreen = (e?: KeyboardEvent<HTMLDivElement>) => {
        if(handle.active === false && e?.code !== 'Tab') {            
            handle.enter()
        } 

        if(handle.active === true && e?.code !== 'Tab') {
            handle.exit()
        }
    }

    // Show video bar    
    const handleMouseIn = () => {
        setShowVideoBar(true);
    }

    // When this function is called, it will wait 2.5 seconds and 
    // then hide the video bar.
    const handleMouseOut= () => {
        timerRef.current = window.setTimeout(() => {
            setShowVideoBar(false);
        }, 2500)
    }

    useEffect(() => {
        // If video is paused, always show the video bar
        if(mouseInView && playing) {
            setShowVideoBar(true);
        }

        // If mouse is in view
        if(!mouseInView && playing) {
            handleMouseIn()
        } 

        // If mouse is not in view
        if(!mouseInView && playing) {
            handleMouseOut()
        }

        return () => window.clearTimeout(timerRef.current || 0);
    }, [mouseInView, playing])

    // Detect if device is an iphone
    

    return (<>
        <Disclosure>
            <div className="max-w-4xl">
                <FullScreen 
                    handle={handle}
                >
                    <div className={`${handle.active ? 'h-full' : 'relative'} group mb-4`} ref={videoFullScreen}>
                        <div className={`text-center bg-black ${handle.active ? 'h-full' : ''}`}>
                            <video 
                                key={videoSrc}
                                preload="metadata"
                                ref={videoRef}
                                playsInline 
                                className={`
                                    text-center 
                                    bg-no-repeat 
                                    bg-contain 
                                    ${videoQuality === '1080p' ? 'w-full' : ''}
                                    ${handle.active ? 'h-full' : ''} 
                                `}
                                onMouseOver={() => setMouseInView(true)}
                                onMouseOut={() => setMouseInView(false)}
                                data-cy="MainVideo"
                                onTimeUpdate={handleProgressBar}
                                onEnded={handleVideoEnd}
                                style={{
                                    backgroundImage: `url(${props.video.thumbnail})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }}
                            >
                                <source src={videoSrc} type="video/mp4"/>
                            </video>
                        </div>
                        
                        {/* Video Loader */}
                        {isWaiting  ?
                            <div 
                                className="absolute h-full mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" 
                                style={{width: '100%'}}
                            >
                                <MainVideoLoader />
                            </div>
                            : 
                            null
                        }
                        
                        {/* Video control bar */}
                        <div 
                            onMouseEnter={() => setMouseInView(true)}
                            onMouseLeave={() => setMouseInView(false)}
                        >
                            {showVideoBar ? 
                                <div 
                                    className="absolute bottom-0 left-0 h-16 bg-trueGray-700/75" style={{width: '100%'}}
                                >
                                    {/* Progress Bar */}
                                    <Range
                                        values={videoProgress}
                                        step={1}
                                        min={0}
                                        max={100}
                                        onChange={(values) => handleVideoSeek(values)}
                                        renderTrack={({ props, children }) => (
                                            <div
                                                onMouseDown={props.onMouseDown}
                                                onTouchStart={props.onTouchStart}
                                                style={{
                                                    ...props.style,
                                                    display: "flex",
                                                    width: "100%"
                                                }}
                                            >
                                                <div
                                                    ref={props.ref}
                                                    style={{
                                                    height: "5px",
                                                    width: "100%",
                                                    borderRadius: "4px",
                                                        background: getTrackBackground({
                                                            values: videoProgress,
                                                            colors: ["#ec4899", "#a3a3a3"],
                                                            min: 0,
                                                            max: 100
                                                        }),
                                                        alignSelf: "center"
                                                    }}
                                                >
                                                    {children}
                                                </div>
                                            </div>
                                        )}
                                        renderThumb={({ props, isDragged }) => (
                                            <div
                                                {...props}
                                                style={{
                                                    ...props.style,
                                                    height: "14px",
                                                    width: "14px",
                                                    borderRadius: "50px",
                                                    backgroundColor: "#ec4899",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: 'pointer'
                                                }}
                                            >
                                            </div>
                                        )}
                                    />

                                    {/* Video Controls */}
                                    <div className="flex flex-row items-start mt-4 ml-5 sm:mt-3">
                                        {/* Play / Pause*/}
                                        {!playing ? 
                                            // Play
                                            <div 
                                                className="bg-transparent rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent" 
                                                onClick={() => togglePlaying(true, false)}
                                                onKeyDown={(e) => togglePlaying(true, true, e)}
                                                role="button"
                                                tabIndex={0}
                                                data-cy="PlayButtonIcon"
                                            >
                                                <svg className="transition duration-200 ease-in-out w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none focus-visible:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            :
                                            // Pause
                                            <div 
                                                className="rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent" 
                                                onClick={() => togglePlaying(false, false)}
                                                onKeyDown={(e) => togglePlaying(false, true, e)}
                                                role="button"
                                                tabIndex={0}
                                                data-cy="PauseButtonIcon"
                                            >
                                                <svg className="transition duration-200 ease-in-out w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                        }
                                    
                                        {/* Audio */}
                                        <div className="cursor-pointer">
                                            {audioRange !== 0 ? 
                                                // Audio on
                                                <div 
                                                    className="ml-5 rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent"
                                                    onClick={() => toggleAudio()}
                                                    onKeyDown={(e) => toggleAudio(e)}
                                                    role="button"
                                                    tabIndex={0}
                                                    data-cy="MuteButtonIcon"
                                                >
                                                    <svg className="transition duration-200 ease-in-out w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>  
                                                :
                                                null
                                            }

                                            {audioRange === 0 ? 
                                                // Audio off
                                                <div>
                                                    <div 
                                                        className="ml-5 rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent"
                                                        onClick={() => toggleAudio()}
                                                        onKeyDown={(e) => toggleAudio(e)}
                                                        role="button"
                                                        tabIndex={0}
                                                        data-cy="UnMuteButtonIcon"
                                                    >
                                                        <svg className="transition duration-200 ease-in-out w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                        </svg>  
                                                    </div>  
                                                </div>
                                                :
                                                null
                                            }
                                        </div>

                                        {/* Audio Slider */}
                                        <div className="ml-3 mt-0.5 hidden sm:block cursor-pointer">
                                            <input 
                                                className="w-24 h-1 rounded-lg appearance-none cursor-pointer accent-pink-500 bg-trueGray-200 focus-visible:ring-1 focus-visible:ring-pink-500 focus-visible:outline-none" 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                step="1" 
                                                value={audioRangeForSlider} 
                                                onChange={(event) => handleAudioRange(event)}
                                            />
                                        </div>

                                        {/* Time */}
                                        <div className="ml-5 mt-1 sm:mt-1.25">
                                            <p className="text-sm font-medium sm:text-base text-trueGray-200">
                                            {videoCurrentTime} / {videoDuration}
                                            </p>
                                        </div>
                                    </div>  

                                    {/* Video controls right */}
                                    <div className="absolute bottom-0 right-0 flex flex-row justify-end mb-3 mr-3">
                                        {/* Video Quality */}
                                        <span 
                                            className="relative inline-block mr-5 rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent"  
                                            onClick={() => handleQualityDropdown()}
                                            onKeyDown={(e) => handleQualityDropdown(e)}
                                            role="button"
                                            tabIndex={0}
                                            data-cy="QualityDropupButton"
                                        >
                                            {/* Quality Icon */}
                                            <svg className={`${videoQualityDropdown ? 'rotate-45' : ''} w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none transition duration-200 ease-in-out`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
                                            </svg>

                                            {/* Quality badge */}
                                            <span 
                                                className="absolute bottom-0 right-0 inline-flex items-center justify-center px-1.5 py-1 font-semibold leading-none text-red-100 transform translate-x-1/2 bg-pink-600 rounded-full"
                                                style={{fontSize: '0.7rem'}}
                                                data-cy="QualityBage"
                                            >
                                                {videoQuality === '480p' ?
                                                    <div className="font-semibold text-trueGray-200">
                                                        SD
                                                    </div>
                                                    :
                                                    <div className="font-semibold text-trueGray-200">
                                                        HD
                                                    </div>    
                                                }
                                            </span>
                                        </span>

                                        {/* Video Quality dropup */}
                                        {videoQualityDropdown ? 
                                            <div className="absolute flex flex-col divide-y divide-gray-100 rounded bottom-20 right-4 bg-trueGray-700 drop-shadow-lg">                          
                                                {/* Items */}
                                                <ul className="py-1 list-none">
                                                    <li 
                                                        className="rounded-md outline-none cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none ring-0 ring-transparent" 
                                                        onClick={() => handleQualityChange('1080p')}
                                                        onKeyDown={(e) => handleQualityChange('1080p', e)}
                                                        role="button"
                                                        data-cy="1080pButton"
                                                        tabIndex={0}
                                                    >
                                                        <p className={`${videoQuality === '1080p' ? 'bg-trueGray-600 text-white' : ''}  
                                                            block py-3 px-8 text-sm sm:text-base font-medium hover:bg-trueGray-600 text-gray-200 hover:text-white focus:outline-none no-underline transition duration-200 ease-in-out`}
                                                        >
                                                            1080p
                                                        </p>
                                                    </li>
                                                    <li 
                                                        className="rounded-md cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none" 
                                                        onClick={() => handleQualityChange('480p')}
                                                        onKeyDown={(e) => handleQualityChange('480p', e)}
                                                        role="button"
                                                        data-cy="480pButton"
                                                        tabIndex={0}
                                                    >
                                                        <p className={`${videoQuality === '480p' ? 'bg-trueGray-600 text-white' : ''}  
                                                            block py-3 px-8 text-sm sm:text-base font-medium hover:bg-trueGray-600 text-gray-200 hover:text-white focus:outline-none no-underline transition duration-200 ease-in-out`}
                                                        >
                                                            480p
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        : null }

                                        {/* Full screen */}
                                        {!props.isMobileDevice ? 
                                            <div 
                                                className="mr-5 bg-transparent border-none rounded-md cursor-pointer focus-visible:ring focus-visible:ring-pink-500 focus-visible:outline-none" 
                                                onClick={() => handleFullScreen()}
                                                onKeyDown={(e) => handleFullScreen(e)}
                                                role="button"
                                                tabIndex={0}
                                                data-cy="FullScreenButton"
                                            >
                                                <svg className="transition duration-200 ease-in-out w-7 h-7 sm:w-8 sm:h-8 text-trueGray-200 hover:text-white focus:outline-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </div>
                                        : null}
                                    </div>
                                </div>
                            : null}
                        </div>
                    </div>
                </FullScreen>
            </div>
        </Disclosure>
    </>)
}

export default MainVideo