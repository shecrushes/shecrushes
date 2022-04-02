import { NextPage } from "next";

// Components
import { RelatedVideo } from '..'

// Types
import type { relatedVideos } from '../../common/types'

interface Props {
    relatedVideos: relatedVideos[];
}


const RelatedVideos: NextPage<Props> = (props: Props) => {
    return (
        <div className="flex flex-col mb-4" data-cy="RelatedVideos">
            {/* Recommended Videos */}
            {props.relatedVideos.map((item: relatedVideos, index: number) => (
                <RelatedVideo key={index} video={item}/>
            ))}
        </div>
    )
}

export default RelatedVideos