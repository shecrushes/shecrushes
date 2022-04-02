import React, { FunctionComponent, useEffect, useState, useCallback, useContext } from "react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import toast from 'react-hot-toast';

// Context
import AuthContext from '../../../context/AuthContext'

// Functions
import { likeComment } from '../,./../../../lib/user/likeComment';
import { unlikeComment } from '../,./../../../lib/user/unlikeComment';
import { getReplies } from '../,./../../../lib/user/getReplies';

// Components
import { Reply, ButtonLoader } from '../../';

// Dayjs
import { default as dayjs } from 'dayjs';
import { default as relativeTime } from 'dayjs/plugin/relativeTime';
import { default as updateLocale } from 'dayjs/plugin/updateLocale';

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
import { comments, commentLike, replies } from "../../../common/types";

interface PageProps {
    comment: comments;

    // Comment Likes
    commentLikes: commentLike[];
    setCommentLikes: React.Dispatch<React.SetStateAction<commentLike[]>>;

    // Reply to comment
    setReplyToCommentId: React.Dispatch<React.SetStateAction<number | null>>;
    setReplyToUsername: React.Dispatch<React.SetStateAction<string>>;

    // User token
    userToken: string;
    userName: string;
}

const Comment: FunctionComponent<PageProps> = ({
    comment,

    // Track comment likes
    commentLikes,
    setCommentLikes,

    // Reply to commenet
    setReplyToCommentId,
    setReplyToUsername,

    userToken,
    userName
}) => {
    // User
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    // Likes
    const [likeActive, setLikeActive] = useState(false)
    const [likeCount, setLikeCount] = useState(Number(comment.likes_count))

    // Replies
    const [commentReplies, setCommentReplies] = useState<replies[]>([])
    const [repliesPage, setRepliesPage] = useState(0)
    const [expandReplies, setExpandReplies] = useState(false)

    // -------
    // Like video
    // -------
    const likeUnlikeVideo = async(comment_id: number) => {
        if(!user) return notSignedIn();

        if(!likeActive) {
            // Push like to array
            const newLike = [{
                comment_id,
                // Current like count of the comment
                likes_count: likeCount + 1
            }]
            
            // Update like state
            setCommentLikes((likes) => [...likes, ...newLike]);
            setLikeActive(true)
            
            if(userName) {
                // Make api call to like video           
                likeComment(comment_id, userToken, userName)
            
                // Update like count
                setLikeCount((prevVal) => prevVal + 1)
            }
        } else {
            // Remove like from array
            const result = commentLikes.filter(like => like.comment_id !== comment_id);

            // Update like state
            setCommentLikes(result);
            setLikeActive(false)

            // Make api call to unlike video
            unlikeComment(comment_id, userToken)

            // Update like count
            setLikeCount((prevVal) => prevVal - 1)
        }
    }   

    const notSignedIn = () => toast('Please sign in to like a comment', {
        duration: 3000,

        // Styling
        className: 'bg-trueGray-800 text-medium text-trueGray-100',
        
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

    // Match the comments a user has liked and display those likes 
    useEffect(() => {
        for (const i in commentLikes) {
            if(commentLikes[i].comment_id === comment.comment_id) {
                setLikeActive(true)
                setLikeCount(commentLikes[i].likes_count)
            }
        }
    }, [commentLikes])

    // -------
    // Replies
    // -------
    const loadReplies = useCallback(async() => {
        if(loading === false) {
            setLoading(true)
            setRepliesPage((prevVal) => prevVal + 5)
            
            // Fetch more replies 
            const newReplies = await getReplies(
                comment.comment_id, 
                repliesPage,
                5
            )
            setCommentReplies((replies) => [...replies, ...newReplies]);            
            setLoading(false)
        }
    }, [loading, repliesPage])

    const showReplies = () => {
        // Fetch the inital replies
        if(commentReplies.length === 0) {
            loadReplies()
        }

        // Show replies
        setExpandReplies((prevVal) => !prevVal)
    }

    // When a reply is added to a top level comment, re-fetch replies
    useEffect(() => {
        if(comment.reply_count) {
            setCommentReplies([])
            setRepliesPage(0)
            setExpandReplies(false)
        }
    }, [comment.reply_count])

  return (
    <>
        <div className="flex justify-between mt-6">
            <div className="flex flex-row">
                <div className='flex flex-row mb-auto'>
                    {/* Profile Pic */}
                    <div className='flex items-center justify-center w-10 h-10 m-auto bg-pink-200 rounded-full'>
                        <h6 className='text-base font-semibold text-trueGray-900'>
                            {comment.username ? comment.username.charAt(0).toUpperCase() : 'A'}
                        </h6>
                    </div>
                </div>

                <div className="flex flex-col ml-3">
                    {/* Username */}
                    <Link href={`/user/${comment.username}`} passHref>
                        <a className="no-underline">
                            {
                                // Render different colour if it's the admin username
                                comment.username === 'shecrushes' ? 
                                <div className="flex flex-row items-center">
                                    <p className='text-sm font-semibold text-pink-500'>@{comment.username}</p>
                                    <svg className="w-4 h-4 ml-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                </div>
                            :
                                // Regular user style
                                `@` + comment.username ? <p className='text-sm font-semibold text-trueGray-400'>{comment.username}</p> 
                                : 
                                <p className='text-sm font-semibold text-trueGray-400'>Anonymous</p>
                            } 
                        </a>
                    </Link>

                    {/* Comment content */}
                    <div className="flex flex-row items-center">
                        <p className="text-trueGray-100">
                            {comment.content}
                        </p>
                    </div>

                    {/* Comment info */}
                    <div className="flex flex-row mt-1">
                        <p className="text-sm text-trueGray-400">
                            {dayjs(comment.created_at).fromNow(true)}
                        </p>

                        {likeCount !== 0 ?
                            <p className="mx-4 text-sm font-semibold text-trueGray-400">
                                {likeCount <= 1 ? likeCount + ' like' : likeCount + ' likes'}  
                            </p>
                        : <div className="mr-2"></div>}

                        <motion.div
                            whileTap={{ opacity: 0.5 }}
                            onClick={() => {
                                setReplyToCommentId(comment.comment_id)
                                setReplyToUsername(comment.username)
                            }}
                        >
                            <p className="text-sm font-semibold text-trueGray-400">
                                Reply
                            </p>
                        </motion.div>
                    </div>

                    {/* View Replies */}
                    {comment.reply_count !== '0' && 
                        <div className="mt-2">
                            {/* Replies Button */}
                            <div 
                                className="flex flex-row items-center" 
                                onClick={() => showReplies()}
                            >
                                <p className="text-sm font-semibold text-trueGray-300">
                                    View Replies ({comment.reply_count})
                                </p>
                                <svg className={`w-5 h-5 text-trueGray-300 ${expandReplies ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {/* Like comment */}
            <div className="flex flex-col items-center">
                <motion.div
                    className="flex flex-col items-center"
                    onClick={() => likeUnlikeVideo(comment.comment_id)}
                    variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1 },
                        pressed: { scale: 0.85 }
                    }}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                >                    
                    {/* Like icon */}
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

        {/* Replies */}
        {expandReplies &&
            <div className="mt-4 ml-16">
                {commentReplies.map((reply: replies, index: number) => {
                    return (
                        <Reply 
                            key={`comment:${index}`}
                            reply={reply}
                            parentCommentId={comment.comment_id}

                            // Reply to comment
                            setReplyToCommentId={setReplyToCommentId}
                            setReplyToUsername={setReplyToUsername}

                            // User
                            userToken={userToken}
                            userName={userName}
                        />
                    )
                })}

                {/* Load more replies */}
                {!loading && (Number(comment.reply_count) !== commentReplies.length) &&
                    <motion.div
                        className="flex justify-start mt-3"
                        whileTap={{ opacity: 0.5 }}
                        onClick={() => loadReplies()}
                    >
                        <div className="flex flex-row items-center">
                            <svg 
                                className={`w-5 h-5 text-trueGray-300`} 
                                viewBox="0 0 24 24"  
                                fill="none"  
                                stroke="currentColor"  
                                strokeWidth="2"  
                                strokeLinecap="round"  
                                strokeLinejoin="round"
                            >  
                                <polyline points="15 10 20 15 15 20" />  
                                <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                            </svg>
                            <p className={`text-sm pl-2 bg-transparent font-semibold border-0 outline-none text-trueGray-300`}>
                                Load more
                            </p>
                        </div>
                    </motion.div>
                }

                {/* Loader */}
                <AnimatePresence>
                    {loading &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}

                            transition={{ duration: 0.1 }}
                        >
                            <div className="flex justify-center mt-4">
                                <ButtonLoader 
                                    width={'7'}
                                    height={'7'}
                                />
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        }
    </>
  );
};

export default Comment
