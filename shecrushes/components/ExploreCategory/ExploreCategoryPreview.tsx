import { FunctionComponent } from 'react'
import Link from 'next/link'
import React, { useState, useCallback} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from 'react-lazyload'

// Fetch videos function
import { getExplore } from '../../lib/explore'

// Components
import { VideoTag } from '..'

// Types
interface video {
  id: string;
  thumbnail: string;
  creator: string;
  views: number;
}

interface category {
  name: string;
  videos: [video]
}

interface Props {
    sections: category[];
}

const ExploreCategoryPreview: FunctionComponent<Props> = (props: Props) => {
    const [sections, setSections] = useState<category[]>(props.sections);
    const [page, setPage] = useState<number>(3)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false)

    // Fetch more category sections
    const loadMore = useCallback(async() => {
        if(loading === false) {
            // Show loader
            setLoading(true)

            // Update page
            setPage((prevVal) => prevVal + 1)

            // Fetch new sections 
            const newVideos = await getExplore(page, 3) // page
            setSections((sections) => [...sections, ...newVideos]);
            
            // Hide loader
            setLoading(false)
        }
    }, [loading, page])

    return (
    <InfiniteScroll
        dataLength={sections.length}
        next={loadMore}
        hasMore={hasMore}
        loader={null}
        scrollThreshold={'300px'}
    >
        <div className='grid grid-cols-1 gap-4 mt-8 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2'>
            {sections.map((category: category) => {
                return (
                    <LazyLoad offset={300} key={`categorySection:${category.name}`}>
                        <div className='flex flex-col'>
                            {/* Video Previews */}
                            <div className='flex flex-col justify-center mx-auto xl:mx-0 md:justify-left'>
                                {/* Category Tag */}
                                <div className='flex mb-1 ml-1'>
                                    <VideoTag 
                                        background={true}
                                        tag={category.name}
                                        notFocusable={false}
                                    />
                                </div>
                                
                                {/* Video Previews */}
                                <div className='flex flex-row' data-cy="ExploreCategory"> 
                                    {category.videos.map((videoPreview: video) => {
                                        return (
                                            <div className="categoryItem" key={`categoryPreview:${videoPreview.id}`}>
                                                <Link href={'/watch/' + videoPreview.id} passHref>
                                                    <a className="no-underline" data-cy="ExploreCategoryVideo"> 
                                                        <div 
                                                            className='mx-1 my-2 cursor-pointer w-28 h-60 lg:w-36 lg:h-64 xl:w-44 xl:h-72'
                                                        >
                                                            <img 
                                                                src={videoPreview.thumbnail}
                                                                alt={videoPreview.id}
                                                                className="object-cover w-full h-full rounded-md"
                                                            />
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>  
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </LazyLoad>
                )
            })}
        </div> 
        </InfiniteScroll>
    )
}


export default ExploreCategoryPreview