import React, { FunctionComponent, useState, useContext } from "react";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

// Context
import AuthContext from '../../../context/AuthContext'

// Dayjs
import { default as dayjs } from 'dayjs';
import { default as relativeTime } from 'dayjs/plugin/relativeTime';
import { default as updateLocale } from 'dayjs/plugin/updateLocale';

// Functions
import { likeComment } from '../,./../../../lib/user/likeComment';
import { unlikeComment } from '../,./../../../lib/user/unlikeComment';

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  relativeTime: {
    past: "%s ago",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy"
  }
})

// Types
import { replies } from "../../../common/types";

interface PageProps {
    reply: replies;
    userToken: string;
    userName: string;
    parentCommentId: number

    // Reply to comment
    setReplyToCommentId: React.Dispatch<React.SetStateAction<number | null>>;
    setReplyToUsername: React.Dispatch<React.SetStateAction<string>>;

}

const Reply: FunctionComponent<PageProps> = ({
    reply,
    userToken,
    userName,
    parentCommentId,
    setReplyToCommentId,
    setReplyToUsername,
}) => {
    // User
    const { user } = useContext(AuthContext)

    // Reply likes
    const [likeActive, setLikeActive] = useState(false)
    const [likeCount, setLikeCount] = useState(Number(reply.likes_count))

    //  -----------
    // Like comments
    // ------------
    const likeUnlikeVideo = (comment_id: number) => {
        if(!user) return notSignedIn();

        if(!likeActive) {
            // Update like state
            setLikeActive(true)

            if(userName) {                
                // Make api call to like video           
                likeComment(comment_id, userToken, userName)
            }
        
            // Update like count
            setLikeCount((prevVal) => prevVal + 1)
        } else {
            // Update like state
            setLikeActive(false)

            // Make api call to unlike video
            unlikeComment(comment_id, userToken)

            // Update like count
            setLikeCount((prevVal) => prevVal - 1)
        }
    }

    const notSignedIn = () => toast('Please sign in to like a reply', {
        duration: 3000,

        // Styling
        className: 'bg-trueGray-800 text-medium text-trueGray-100',
        
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

  return (<>
        <div 
            className="flex flex-row justify-between mt-4" 
        >
            <div className="flex flex-row">
                {/* Profile Pic */}
                <div className='flex flex-row mb-auto'>
                    <div className='flex items-center justify-center m-auto bg-pink-200 rounded-full w-9 h-9'>
                        <h6 className='text-base font-semibold text-trueGray-900'>
                            {reply.username ? reply.username.charAt(0).toUpperCase() : 'A'}
                        </h6>
                    </div>
                </div>

                <div className="flex flex-col ml-3">
                    {/* Username */}
                    <div>
                        <p className='text-sm font-semibold text-trueGray-400'>
                            @{reply.username ? reply.username : 'Anonymous'}
                        </p>    
                    </div>

                    {/* Comment content */}
                    <div className="flex flex-row items-center">
                        <p className="text-trueGray-100">
                            {reply.content}
                        </p>
                    </div>

                    {/* Comment info */}
                    <div className="flex flex-row mt-1">
                        <p className="text-sm text-trueGray-400">
                            {dayjs(reply.created_at).fromNow(true)}
                        </p>

                        {likeCount !== 0 ?
                            <p className="mx-4 text-sm font-semibold text-trueGray-400">
                                {likeCount <= 1 ? likeCount + ' like' : likeCount + ' likes'}  
                            </p>
                        : <div className="mr-2"></div>}

                        <motion.div
                            whileTap={{ opacity: 0.5 }}
                            onClick={() => {
                                setReplyToCommentId(parentCommentId)
                                setReplyToUsername(reply.username)
                            }}
                        >
                            <p className="text-sm font-semibold text-trueGray-400">
                                Reply
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Like comment */}
            <div className="flex flex-col items-center">
                <motion.div
                    className="flex flex-col items-center"
                    onClick={() => likeUnlikeVideo(reply.comment_id)} 
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
                    

                    {likeActive ? 
                        <svg 
                            className={`w-5 h-5 drop-shadow font-semibold ${likeActive ? 'text-pink-500' : 'text-trueGray-300'}`}  
                            fill="currentColor" 
                            viewBox="0 0 20 20" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                        </svg>
                        :
                        <svg 
                            className={`w-5 h-5 drop-shadow font-semibold ${likeActive ? 'text-pink-500' : 'text-trueGray-300'}`}  
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            strokeWidth="2" 
                            stroke="currentColor" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >  
                            <path stroke="none" d="M0 0h24v24H0z"/>  
                            <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" />
                        </svg>

                    }
                </motion.div>
            </div>
        </div> 
    </>
  );
};

export default Reply
