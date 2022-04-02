import { FC, useEffect, useRef, useState, useCallback, useContext } from "react";
import Link from 'next/link';
import Sheet from 'react-modal-sheet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";

// Components
import { 
    DefaultLoader, 
    FormError, 
    Comment 
} from "../..";

// Functions
import { getComments } from '../../../lib/user/getComments';
import { addComment } from '../../../lib/user/addComment';
import { addReply } from '../../../lib/user/addReply';

// Types
import type { comments, commentLike } from '../../../common/types';

// Context
import AuthContext from '../../../context/AuthContext'

// Hooks
import useWindowSize from "../../../hooks/useWindowSize";

type Props = {
    videoId: string;
    showComments: boolean;
    setShowComments: (show: boolean) => void;

    // user
    userToken: string;
}

// Validation schema
const CommentSchema = Yup.object().shape({
  comment: Yup.string().required('Please write a comment')
  .max(69, 'Comment hit 69 character limit ;)')
})

const BottomSheet: FC<Props> = (props: Props) => {
    // User context
    const { user, userToken } = useContext(AuthContext)

    // Hooks
    const [, windowHeight] = useWindowSize();

    const [comments, setComments] = useState<comments[]>([]);
    const [page, setPage] = useState(0)
    const [commentCount, setCommentCount] = useState<string | null>(null)
    const [openedComments, setOpenedComments] = useState(false)
    const [loading, setLoading] = useState(false);
    const [inputFocused, setInputFocused] = useState(false)

    // Comment Likes
    const [commentLikes, setCommentLikes] = useState<commentLike[]>([])

    // Reply to comment
    const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null)
    const [replyToUsername, setReplyToUsername] = useState('')

    // If sheet is opened, fetch comments
    useEffect(() => {
        if(props.showComments && !openedComments) {
            loadMoreComments()
            setOpenedComments(true)
        }
    }, [props.showComments])

    // Fetch more comments
    const loadMoreComments = useCallback(async() => {
        if(loading === false) {
            setLoading(true)

            // Update page
            setPage((prevVal) => prevVal + 10)

            // Fetch more comments                //faststeelblueorca
            const newComments = await getComments(props.videoId, page, 10)
            
            // Destructure data
            const { commentsCount, commentsItems } = newComments;

            // Set data
            setCommentCount(commentsCount[0].count)
            setComments((prevComments) => [...prevComments, ...commentsItems])
            setLoading(false)
        }
    }, [loading, page])

    // Formik config
    const formik = useFormik({
        initialValues: {
            comment: replyToUsername ? '@' + replyToUsername + ' ' : '',
        },
        enableReinitialize: true,
        validationSchema: CommentSchema,
        onSubmit: values => {
            if(replyToCommentId !== null && replyToUsername !== '') {                
                // Post reply
                const addReplyRes = addReply(
                    replyToCommentId,
                    userToken,
                    values.comment,
                )
                replyToCommentRequest(addReplyRes, replyToUsername)

                // Using the top level comment id, we find the index of the comment the user is
                const commentIndex = comments.findIndex((obj => 
                    obj.comment_id == replyToCommentId
                ));
                
                // Find the comment with replyToCommentId and increment the reply count.
                // this will trigger a re-fetch of the replies.
                comments[commentIndex].reply_count = (Number(comments[commentIndex].reply_count) + 1).toString()
                    
                // Reset state
                setReplyToCommentId(null)
                setReplyToUsername('')
                formik.resetForm()
            } else {
                // Post comment
                const addCommentRes = addComment(
                    props.videoId,
                    userToken,
                    values.comment,
                )
                addCommentVideoRequest(addCommentRes)
                
                // Add user comment to comments array
                const userComment: comments[] = [{
                    comment_id: 0,
                    content: values.comment,
                    created_at: new Date().toLocaleString(),
                    likes_count: "0",
                    reply_count: "0",
                    username: user?.displayName || "Anonymous",
                }];
                setComments((prevComments) => [...userComment, ...prevComments])
    
                // Reset state
                formik.resetForm()
            }
        },
        validateOnBlur: false,
        validateOnChange: false
    });

    // React toast
    const addCommentVideoRequest = (addCommentRes: Promise<any>) => toast.promise(
        addCommentRes,
        {
            loading: 'Loading',
            success: (data) => `Added comment to video`,
            error: (err) => `Unable to add comment to video`,
        },
        {
            // Styling
            className: 'bg-trueGray-800 text-medium text-trueGray-100',
            
            success: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },

            error: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },
        }
    );

    const replyToCommentRequest = (replyToComment: Promise<any>, username: string) => toast.promise(
        replyToComment,
        {
            loading: 'Loading',
            success: (data) => `Replied to ${username}`,
            error: (err) => `Unable to reply to ${username}`,
        },
        {
            // Styling
            className: 'bg-trueGray-800 text-medium text-trueGray-100',
            
            success: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },

            error: {
                duration: 2000,
                iconTheme: {
                    primary: '#ec4899',
                    secondary: '#e4e4e7',
                },
            },
        }
    );

    return (
        <>
            <Sheet 
                isOpen={props.showComments}
                onClose={() => props.setShowComments(false)}
                snapPoints={[0.8, 0, 0, 0]}
                initialSnap={0}
            >
                <Sheet.Container>
                    <Sheet.Header>
                        <div className="flex items-center justify-center py-3 rounded-t-md bg-trueGray-800">
                            <div className="flex-1"></div>
                            <p className="font-semibold text-center text-trueGray-100">
                                {commentCount ? commentCount + ' comments' : 'Comments'}
                            </p>

                            <div className="items-center flex-1">
                                <svg onClick={() => props.setShowComments(false)} className="block w-6 h-6 ml-auto mr-3 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </Sheet.Header>

                    <Sheet.Content>
                        {/* Comments */}
                        <div className="flex flex-col h-full overflow-auto">
                            {/* Advertisment */}
                            <div className="flex flex-col py-2 bg-white bg-opacity-20">                         
                                {/* Advertisment label */}
                                <div className="flex flex-row items-center px-2 mt-1 ">
                                    <svg className="w-5 h-5 text-trueGray-300"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <path d="M7 15v-4a2 2 0 0 1 4 0v4" />  <line x1="7" y1="13" x2="11" y2="13" />  <path d="M17 9v6h-1.5a1.5 1.5 0 1 1 1.5 -1.5" /></svg>
                                    <p className="ml-1 text-xs font-medium text-trueGray-300">Advertisment</p>
                                </div>
                            </div>

                            {comments &&
                                <div className="p-4 pt-0">
                                    {comments.map((comment, index: number) => {
                                        return (
                                            <Comment 
                                                key={index}
                                                comment={comment}

                                                // Store liked comments
                                                commentLikes={commentLikes}
                                                setCommentLikes={setCommentLikes}

                                                // Reply to comment
                                                setReplyToCommentId={setReplyToCommentId}
                                                setReplyToUsername={setReplyToUsername}

                                                // User
                                                userToken={userToken}
                                                userName={user?.displayName || ''}
                                            />
                                        )
                                    })}
                                </div>
                            }

                            {/* Load more replies */}
                            {!loading && (Number(commentCount) !== comments.length) &&
                                <motion.div
                                    className="flex justify-start p-4 pt-0"
                                    whileTap={{ opacity: 0.5 }}
                                    onClick={() => loadMoreComments()}
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
                            

                            {/* Show if there are no comments */}
                            {!loading && !comments ?
                                <div className="flex items-center justify-center h-full mb-6">
                                    <p className="text-trueGray-100">No comments, be the first to post something!</p>
                                </div>   
                                :
                                null 
                            }
                            
                            {/* Show while comments are loading */}
                            {loading && 
                                <div className="flex justify-center my-6">
                                    <DefaultLoader />
                                </div>
                            }

                            {/* Add comment field */}
                            {user ? 
                                <div className="sticky bottom-0 w-full mt-auto bg-[#333333] z-50">
                                    {/* Form Error */}
                                    {formik.errors.comment &&  
                                        <div className="mx-2 mb-1">
                                            <FormError errorMessage={formik.errors.comment} />
                                        </div>
                                    }

                                    {/* Replying to banner */}
                                    {replyToCommentId !== null && replyToUsername !== '' &&
                                        <div className="flex flex-row justify-between py-1.5 bg-trueGray-700 px-2">
                                            <p className="text-trueGray-400">
                                                Replying to @{replyToUsername}
                                            </p>
                                            <svg 
                                                onClick={() => {
                                                    setReplyToCommentId(null)
                                                    setReplyToUsername('')
                                                }} 
                                                className="block w-5 h-5 text-trueGray-300" 
                                                fill="currentColor" 
                                                viewBox="0 0 20 20" 
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    }

                                    {/* Comment input */}
                                    <form className="relative" onSubmit={formik.handleSubmit}>
                                        <input 
                                            className="pr-16 mb-4 text-base border-t-2 rounded-none border-trueGray-400 form-input focus:border-trueGray-400"
                                            placeholder="Add comment..."
                                            type="text" 
                                            id="comment"
                                            onChange={formik.handleChange}
                                            onFocus={() => setInputFocused((prevVal) => !prevVal)}
                                            value={formik.values.comment}
                                        />
                                        <button type="submit" className="absolute bg-transparent border-0 top-2.5 right-2"> 
                                            <div className="flex items-center justify-center w-10 h-10 m-auto bg-pink-500 border-t rounded-full border-trueGray-400">
                                                <svg className="w-6 h-6 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            </div> 
                                        </button>
                                    </form>
                                </div>
                            : 
                                <div className="sticky bottom-0 w-full mt-auto bg-[#333333] ">
                                    <div className="w-full px-4 py-3.5 mb-4">
                                        <div className='flex justify-center text-trueGray-200'>
                                            <p>
                                                Please 
                                                <Link href='/signin' passHref>
                                                    <span className='ml-1 text-pink-500 cursor-pointer'>
                                                        <a>sign in </a>
                                                    </span>
                                                </Link>
                                                to comment.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div> 
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        </>
    )
}

export default BottomSheet