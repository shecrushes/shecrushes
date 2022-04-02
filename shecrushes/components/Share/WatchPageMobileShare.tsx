import { NextPage } from "next";
import { ShareIcon } from '@heroicons/react/solid'

interface Props {
    id: string
}

const WatchMobileShare: NextPage<Props> = (props) => {
    // Share video
    const handleShareVideo = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Share this video',
                    url: `https://shecrushes.com/watch/${props.id}`,
                })
                .catch(error => {
                    console.error('Something went wrong', error);
                });    
        }
    }

    return (
       <button 
            data-cy="ShareVideo" 
            type="button"
            onClick={handleShareVideo}
            className="bg-transparent border-0 cursor-pointer"
        >
            <span className="sr-only">Share video</span>
            <ShareIcon className="w-8 h-8 text-trueGray-100" aria-hidden="true" />
        </button>
    )
}

export default WatchMobileShare