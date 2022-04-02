import type { NextPage } from 'next'
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useEffect, useState, useCallback, useContext } from 'react'
import { motion } from "framer-motion";

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

// Components
import { 
  Navbar, 
  MobileNavbar, 
  ProfileDropdownMenu,
  DefaultLoader,
  PureImage,
  Footer 
} from '../../components'

// Functions
import { getProfile } from '../../lib/profile/getProfile';

// Context
import AuthContext from '../../context/AuthContext'

// Types 
import type { profileVideoLikes, profileComments } from '../../common/types'


const UserProfile: NextPage = () => {  
  // User context
  const { user } = useContext(AuthContext)

  // User status
  const router = useRouter();
  const queryKey = 'username';
  const username = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

  // Tab state
  const [likes, setLikes] = useState<profileVideoLikes[]>([]);
  const [comments, setComments] = useState<profileComments[]>([]);
  const [likesCount, setLikesCount] = useState('');
  const [commentsCount, setCommentsCount] = useState('');
  const [activeTab, setActiveTab] = useState(0)
  
  // State
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)

  // On load, fetch profile data
  useEffect(() => {
    if(username) {
        loadProfileData(username)
    }
  }, [username])
  
  // Fetch profile data
  const loadProfileData = useCallback(async(username) => {
    if(loading === false) {
      setLoading(true)

      // Update page
      setPage((prevVal) => prevVal + 5)

      // Fetch more comments                
      const newComments = await getProfile(username, page, 5)
      
      // Destructure data
      const { userLikes, userComments, counts } = newComments;
      
      // Set data
      setLikes((prevLikes) => [...prevLikes, ...userLikes])
      setComments((prevComments) => [...prevComments, ...userComments])

      // Set the data count to state, this will stop returning after the first page
      if(counts.userLikesCount && counts.userCommentsCount ) {
        setLikesCount(counts.userLikesCount[0].count)
        setCommentsCount(counts.userCommentsCount[0].count)
      } 
      
      setLoading(false)
    }
  }, [loading, page])


  // Set the active tab based on the id clicked
  const showActiveTab = (id: number) => {
    switch (id) {
      // Liked tab (fetch data based on tab)
      case 0:
        setActiveTab(0)
        break;
      
      // Comments tab
      case 1:
        setActiveTab(1)
        break;
    }
  }

  return (
      <div className="min-h-screen overflow-x-auto font-sans dark bg-trueGray-900">
        <Head>
            <title>@{username} - SheCrushes</title>
        </Head>

        {/* Navbar */}
        <Navbar />
        <MobileNavbar />
        
        <main className="min-h-screen px-2 mx-auto overflow-x-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Desktop profile info */}
            <div className='flex-row justify-between hidden mt-8 md:flex'>
                <div className='flex flex-row'>
                    {/* Profile Image */}
                    <div className='flex items-center justify-center w-16 h-16 mr-3 bg-pink-200 rounded-full'>
                        <h4 className='text-3xl font-semibold text-trueGray-900'>
                            {username ? username[0].charAt(0).toUpperCase() : 'A'}
                        </h4>
                    </div>

                    {/* Username & likes */}
                    <div className='flex flex-col justify-center'>
                        <p className='font-semibold text-trueGray-100'>
                            @{username}
                        </p>

                        {/* <p className='text-sm font-semibold text-left text-trueGray-400'>
                            Total Likes: 
                        </p> */}
                    </div>
                </div>

                {/* Settings icon */}
                {user?.displayName === username && 
                    <div className='flex flex-col justify-center'>
                        <ProfileDropdownMenu />
                    </div>
                }
            </div>

            {/* Mobile profile info */}
            <div className='flex justify-center mt-8 md:hidden'>
                <div className='flex flex-col justify-center'>
                    {/* Profile Image */}
                    <div className='flex items-center justify-center w-16 h-16 m-auto bg-pink-200 rounded-full'>
                        <h4 className='text-3xl font-semibold text-trueGray-900'>
                            {username ? username[0].charAt(0).toUpperCase() : 'A'}
                        </h4>
                    </div>

                    {/* Username  */}
                    <div className='flex flex-col justify-center my-2'>
                        <p className='text-lg font-semibold text-trueGray-100'>
                            @{username}
                        </p>

                        {/* <p className='text-sm font-semibold text-center text-trueGray-400'>
                            Total Likes: 
                        </p> */}
                    </div>
                </div>
            </div>

            {/* Profle Tabs */}
            <ul className="flex flex-wrap justify-center list-none md:justify-start">
                <li onClick={() => showActiveTab(0)}>
                    <a 
                        href="#" 
                        className={`${activeTab === 0 ? 'activeTab activeTabBorder' : "inActiveTab"} inline-flex pt-4 pb-2 mr-3 font-medium text-center no-underline`} 
                    >
                        <svg className={`${activeTab === 0 ? 'activeTab' : "inActiveTab"} w-5 h-5 mr-2`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                        Liked Posts
                    </a>
                </li>
                <li onClick={() => showActiveTab(1)}>
                    <a href="#" className={`${activeTab === 1 ? 'activeTab activeTabBorder' : "inActiveTab"} inline-flex pt-4 pb-2 mx-3 font-medium text-center no-underline border-b-2 rounded-t-lg active`} aria-current="page">
                        <svg className={`${activeTab === 1 ? 'activeTab' : "inActiveTab"} w-5 h-5 mr-2`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path></svg>
                        Comments
                    </a>
                </li>
            </ul>

            {/*  Tab Content */}

            {/* Likes */}
            {activeTab === 0 &&
            <>
                <div className='flex items-center justify-center'>
                    <div className='w-full mt-4'>
                        {/* User video likes */}
                        {likes &&
                            <div className='grid grid-cols-3 md:grid-cols-4'>
                                {likes.map((video: profileVideoLikes, index: number) => {
                                    return (
                                        <>
                                            <div className="flex items-center" key={video.video_id}>   
                                                <Link href={`/watch/${video.video_id}`} passHref>   
                                                    <a className='h-full'>                   
                                                        <PureImage 
                                                            key={index}
                                                            imageSrc={video.thumbnail}
                                                            videoId={video.video_id}
                                                        />
                                                    </a>
                                                </Link>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        }

                        {/* Load more replies */}
                        {!loading && (Number(likesCount) !== likes.length) &&
                            <motion.div
                                className="flex justify-start p-2 mt-2 cursor-pointer md:p-0 md:py-2"
                                whileTap={{ opacity: 0.5 }}
                                onClick={() => loadProfileData(username)}
                            >
                                <div className="flex flex-row items-center">
                                    <svg 
                                        className={`md:w-5 md:h-5 w-4 h-4 text-pink-500`} 
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
                                    <p className={`text-sm md:text-base pl-2 bg-transparent font-medium border-0 outline-none text-pink-500`}>
                                        Load more
                                    </p>
                                </div>
                            </motion.div>
                        }

                        {/* No comments message */}
                        {likesCount === '0' &&
                            <div className='mt-6 text-center'>
                                <p className='font-medium text-trueGray-300'>{username + '\'s'} likes will show up here.</p>
                            </div>
                        }

                        {/* Show while comments are loading */}
                        {loading && 
                            <div className="flex justify-center my-6">
                                <DefaultLoader />
                            </div>
                        }
                    </div>
                </div>
            </>
            }

            {/* Comments */}
            {activeTab === 1 &&
            <>
                <div className='flex flex-col mt-4'>
                    {/* User video comments */}
                    {comments &&
                        <>
                        {comments.map((comment: profileComments, index: number) => {
                            return (<>
                                {/* Comment */}
                                <Link href={`/watch/${comment.video_id}`} passHref>
                                    <a className='no-underline'>
                                        <motion.div 
                                            className='flex flex-row w-full px-4 py-3 border-t-0 border-b border-l-0 border-r-0 border-solid bg-trueGray-800 border-trueGray-500' 
                                            whileTap={{ transition: { duration: 0.1 }, backgroundColor: "#303030" }}
                                            key={index}
                                        >                         
                                            {/* Reply indicator */}
                                            {comment.reply_to &&
                                                <div className='mr-3 border border-dashed md:border-1 border-trueGray-400'></div>
                                            }

                                            <div className='flex flex-row mb-auto'>
                                                {/* Profile Pic */}
                                                <div className='flex items-center justify-center w-8 h-8 m-auto bg-pink-200 rounded-full md:w-10 md:h-10'>
                                                    <h6 className='text-sm font-semibold md:text-lg text-trueGray-900'>
                                                        {comment.username ? comment.username.charAt(0).toUpperCase() : 'A'}
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="flex flex-col ml-2">
                                                {/* Username */}
                                                <div>
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
                                                </div>

                                                {/* Comment content */}
                                                <div className="flex flex-row items-center">
                                                    <p className="text-trueGray-100">
                                                        {comment.content}
                                                    </p>

                                                    <p className="ml-1.5 text-xs text-trueGray-400">
                                                        {dayjs(comment.created_at).fromNow(true)}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </a>
                                </Link>
                            </>
                            )
                        })}
                    </>
                }

                {/* Load more replies */}
                {!loading && (Number(commentsCount) !== comments.length) &&
                    <motion.div
                        className="flex justify-start p-2 mt-2 cursor-pointer"
                        whileTap={{ opacity: 0.5 }}
                        onClick={() => loadProfileData(username)}
                    >
                        <div className="flex flex-row items-center">
                            <svg 
                                className={`md:w-5 md:h-5 w-4 h-4 text-pink-500`} 
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
                            <p className={`text-sm md:text-base pl-2 bg-transparent font-medium border-0 outline-none text-pink-500`}>
                                Load more
                            </p>
                        </div>
                    </motion.div>
                }

                {/* No comments message */}
                {commentsCount === '0' &&
                    <div className='mt-6 text-center'>
                        <p className='font-medium text-trueGray-300'>{username + '\'s'} comments will show up here.</p>
                    </div>
                }

                {/* Show while comments are loading */}
                {loading && 
                    <div className="flex justify-center my-6">
                        <DefaultLoader />
                    </div>
                }
                </div>
            </>
            }
        </main>
        
        <Footer />
    </div>
  )
}

export default UserProfile
