import { NextPage } from "next";
import React, { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from 'react-masonry-css'

// Import Swiper React components
import { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import 'swiper/css/virtual';

// Fetch function
import { getCategory } from '../../lib/category'

// Hooks
import useWindowSize from "../../hooks/useWindowSize";

// Component
import { SingleVideo, SingleVideoMobile } from '..'

// Types
import type { frontPageVideo as video, likes } from '../../common/types'

interface Props {
    data: video[];
    category: string;
    isMobileDevice: boolean;
}

const VideoContent: NextPage<Props> = (props) => {
    const [videos, setVideos] = useState<video[]>(props.data);
    const [mobileVideos, setMobileVideos] = useState<video[]>(props.data);
    const [page, setPage] = useState(2)
    const [mobilePage, setMobilePage] = useState(2)
    const [hasMore] = useState(true);
    const [loading, setLoading] = useState(false)
    const [isSafari, setIsSafari] = useState(false)
    
    // Video State
    const [likes, setLikes] = useState<likes[]>([])
    const [toggleVolume, setToggleVolume] = useState(-1)
    const [showComments, setShowComments] = useState(false);

    // Hooks
    const [, windowHeight] = useWindowSize();

    // Layout breakpoints
    const breakpointColumnsObj = {
        default: 4,
        1280: 3,
        1024: 2,
    };

    // Fetch more videos
    const loadMore = useCallback(async() => {
        if(loading === false) {
            setLoading(true)

            // Update page
            setPage((prevVal) => prevVal + 1)

            // Fetch new videos 
            const newVideos = await getCategory(props.category, page, 8) // page
            setVideos((videos) => [...videos, ...newVideos]);
            setLoading(false)
        }
    }, [props.category, loading, page])

    // Fetch more mobile videos
    const loadMoreMobile = useCallback(async() => {
        if(loading === false) {
            setLoading(true)

            // Update page
            setMobilePage((prevVal) => prevVal + 1)

            // Fetch new videos 
            const newVideos = await getCategory(props.category, mobilePage, 2)
            setMobileVideos((videos) => [...videos, ...newVideos]);
            setLoading(false)
        }
    }, [props.category, loading, mobilePage])

    return (
    <>
        {/* Desktop */}
        <div className="hidden md:block md:mt-8">
            <InfiniteScroll
                dataLength={videos.length}
                next={loadMore}
                hasMore={hasMore}
                loader={null}
                scrollThreshold="400px"
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="max-w-screen-xl mx-auto masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {videos.map((data: video, index: number) => (
                        <SingleVideo 
                            key={`desktopPost:${index}`} 
                            video={data} 
                            index={index} 

                            // Volume
                            toggleVolume={toggleVolume} 
                            setToggleVolume={setToggleVolume}
                        />
                    ))}
                </Masonry>
            </InfiniteScroll>
        </div>
        
        {/* Mobile */}
        <div className="w-screen md:hidden" style={{height: `${windowHeight}px`}}>
            <Swiper
                direction={"vertical"}
                pagination={{
                    clickable: false,
                }}
                edgeSwipeThreshold={10}
                modules={[Virtual]}
                virtual
                onSwiper={(swiper: any) => {
                    setIsSafari(swiper.browser.isSafari)
                }}
                onSlideNextTransitionStart={() => loadMoreMobile()}
            >
                {mobileVideos.map((data: video, index: number) => (
                    <SwiperSlide key={data.id} virtualIndex={index}>
                        <div className="absolute w-full h-full overflow-hidden touch-none">
                            <SingleVideoMobile 
                                video={data} 
                                index={index} 
                                category={props.category}
                                isMobileDevice={props.isMobileDevice}
                                isSafari={isSafari}

                                // Volume
                                toggleVolume={toggleVolume} 
                                setToggleVolume={setToggleVolume}
                                
                                // Likes
                                likes={likes}
                                setLikes={setLikes}

                                // Comments
                                showComments={showComments}
                                setShowComments={setShowComments}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>           
        </div>
    </>
    )
}

export default VideoContent;