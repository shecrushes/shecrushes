import { NextPage } from "next";
import Link from 'next/link'

// Hooks
import useMobileDevice from '../../hooks/useCheckMobileScreen'

// Components
import { WatchPageMobileShare, DesktopShare } from '..'

// Types
import type { watchVideo as video } from '../../common/types'

interface Props {
    video: video;
}


const MainVideoInfo: NextPage<Props> = (props: Props) => {
    // Hooks
    const isMobileOrTablet = useMobileDevice();

    // Format title & tags
    const tags = JSON.parse(props.video.tags)
    const tagsParsed = tags.join(" ")

    return (
        <div>
            {/* Video Title */}
            <div className="flex flex-row items-center justify-between mb-3">
                <h3 
                    className="text-xl font-semibold sm:text-2xl text-trueGray-200 line-clamp-1"
                    data-cy="VideoTitle"
                > 
                    {tagsParsed}
                </h3>

                {/* Share Video */}
                <div className="ml-2">
                    {isMobileOrTablet 
                        ?   
                        <WatchPageMobileShare id={props.video.video_id} /> 
                        : 
                        <DesktopShare id={props.video.video_id} />
                    }
                    
                </div>
            </div>
            
            {/* Seperator */}
            <div className="flex flex-row items-center pt-3 border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-trueGray-800"></div>
            
            {/* Star Name & View views*/}
            <div className="flex flex-row justify-between">
                {/* Star Name */}
                <div className="flex flex-row items-center pt-2">
                    <p className="text-trueGray-400 mr-1.5">Pornstar: </p> 
                    <p className="font-semibold tracking-wide text-pink-500" data-cy="VideoStar">{props.video.pornstar}</p>

                    {/* Star icon */}
                    <svg className="w-4 h-4 ml-1 mt-0.5 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                </div>

                {/* Video views */}
                {props.video.views ? 
                    <div className="flex flex-row items-center pt-2">
                        <p className="mr-1 font-semibold text-trueGray-400">{props.video.views}</p>  
                        <p className="font-semibold text-trueGray-400">views</p>
                    </div>
                    :
                    null
                }
            </div>

            {/* Tags */}
            <div className="flex flex-row items-center pt-2">
                {/* Tags Title */}
                <p className="text-trueGray-400 mr-1.5">Tags: </p> 

                {/* Tags */}
                <div className="flex flex-wrap">
                    {tags.map((item: string, index: number) => {
                        return (
                            <div className="py-[4px] px-[6px] mx-1 my-1 rounded bg-trueGray-800" key={index} data-cy="VideoTag">
                                <Link href={`/category/${item}`} passHref>
                                    <a className="no-underline"> 
                                        <p className="text-sm font-semibold text-trueGray-200">{item}</p>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainVideoInfo