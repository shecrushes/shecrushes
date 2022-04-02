import { NextPage } from "next";

interface Props {
    id: string
}

const MobileShare: NextPage<Props> = (props) => {
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
            <svg className="w-7 h-7 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path></svg>
        </button>
    )
}

export default MobileShare