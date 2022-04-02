import { NextPage } from "next";
import Link from 'next/link';

// Types
import type { relatedVideos } from '../../common/types'

interface Props {
    video: relatedVideos;
}

const RelatedVideo: NextPage<Props> = (props: Props) => {
    // Format title & tags
    const tags = JSON.parse(props.video.tags)
    const tagsParsed = tags.join(" ")
    return (
        <Link href={'/watch/[key]'} as={`/watch/${props.video.video_id}`}>
            <a 
                className="mb-3 -mr-2 no-underline focus:text-white focus:bg-trueGray-800 focus:outline-none"
                data-cy="RelatedVideo"
            >
                <div className="flex flex-row no-underline transition duration-200 ease-in-out cursor-pointer hover:bg-trueGray-800 hover:text-trueGray-100"
                >
                    {/* Image */}
                    <div>
                        <img
                            src={props.video.thumbnail}
                            alt={props.video.title + ' related video'}
                            width={200}
                            height={120}
                            className="object-cover rounded"
                            data-cy="RelatedVideoImage"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col items-start justify-start my-3">
                        <div className="flex items-start mx-3">
                            <h3 
                                className="text-base font-semibold sm:text-lg text-trueGray-200 line-clamp-2"
                                data-cy="RelatedVideoTitle"
                            > 
                                {tagsParsed} by {props.video.pornstar}
                            </h3>
                        </div>

                        {/* Star */}
                        <div className="flex flex-row items-center mx-3 my-1 text-sm">
                            {/* Star name */}
                            <p 
                                className="font-semibold tracking-wide text-pink-500 line-clamp-1"
                                data-cy="RelatedVideoStar"
                            > 
                                {props.video.pornstar}
                            </p>

                            {/* Star icon */}
                            <svg className="w-4 h-4 ml-1 mt-0.5 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                        </div>

                        {/* Views */}
                        <div className="flex flex-row items-center mx-3">
                            {props.video.views ? 
                                <div className="flex flex-row items-center text-sm">
                                    <p className="mr-1 font-semibold tracking-wide text-trueGray-400">{props.video.views}</p>  
                                    <p className="font-semibold text-trueGray-400">views</p>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default RelatedVideo