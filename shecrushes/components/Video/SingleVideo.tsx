import { NextPage } from "next";
import Link from 'next/link';
import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'

// Component
import { VideoTag, DesktopSingleVideoLoader } from '..'

// Types
import type { frontPageVideo as video } from '../../common/types'

interface Props {
    video: video;
    toggleVolume: number;
    setToggleVolume: React.Dispatch<React.SetStateAction<number>>;
    index: number;
}

const SingleVideo: NextPage<Props> = (props) => {  
    // State
    const [shouldHaveOffset, setShouldHaveOffset] = useState<boolean>(false)

    // Determine is video should have margin offset
    useEffect(() => {
        if(props.index < 4) {
            setShouldHaveOffset(false)
        } else if ((props.index % 2) !== 0) {
            setShouldHaveOffset(true)
        }
    }, [])

    return (
        <>
            <Link href={'/watch/' + props.video.id} passHref>
                <a tabIndex={props.index} data-cy='DesktopSingleVideo'>
                    <LazyLoad 
                        key={props.index}
                        placeholder={
                            <DesktopSingleVideoLoader />
                        }
                        offset={100}
                    >
                        <div className={`flex relative mb-4 bg-trueGray-900 rounded-md items-center justify-center cursor-pointer`}>
                            <img
                                src={props.video.thumbnail}
                                alt={props.video.id}
                                width={310}
                                height={shouldHaveOffset ? 581 : 549} // shouldHaveMargin ? 581 : 549
                                className="object-cover rounded-md "
                            />

                            {/* Tags */}
                            <div className="absolute bottom-0 w-auto p-4 xl:left-0" tabIndex={-1}>
                                <div className="flex flex-wrap mb-2.5">
                                    {props.video.tags.map((tag: string, index: number) => {
                                        return (
                                            <VideoTag key={index} tag={tag} notFocusable={true} noMargin={false}/>
                                        )
                                    })}
                                </div>
                            </div>                   
                        </div>
                    </LazyLoad>
                </a>
            </Link>
        </>
    )
}

export default SingleVideo