import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { AnimatePresence } from "framer-motion"

// Components
import { 
    Navbar, 
    MobileNavbar,
    MainVideoLoader, 
    ButtonLoader,
    FormError,
    Footer 
} from '../components'

// Context
import AuthContext from '../context/AuthContext'

// Firebase
import { getAuth, sendEmailVerification } from "firebase/auth";

const Settings: NextPage = () => {  
  // User status
  const { user, loggedIn, setUser } = useContext(AuthContext)
  const auth = getAuth();

  // State
  const router = useRouter();
  const [sentEmailVerification, setSentEmailVerification] = useState(false)
  const [emailVerifyLoader, setEmailVerifyLoader] = useState(false)
  const [emailMessage, setEmailMessage] = useState('')
  const [unknownError, setUnknownError] = useState('')

  // Set user to context
  useEffect(() => {
    if(loggedIn) {
      const currentUser = auth.currentUser;
      
      if(currentUser !== null) {
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          emailVerified: currentUser.emailVerified,
          uid: currentUser.uid,

          creationTime: currentUser.metadata.creationTime || '',
          lastSignInTime: currentUser.metadata.lastSignInTime || ''
        })
      } 
    } else {
        router.push('/signin')
    }
  }, [loggedIn])

  const verifyEmail = () => {
    if(!sentEmailVerification) {
        // Show loader
        setEmailVerifyLoader(true)
        
        // Send email verification
        if(auth.currentUser !== null) {
            sendEmailVerification(auth.currentUser)
            .then(() => {
                setEmailMessage('Verification email sent!')
                setEmailVerifyLoader(false)
                setSentEmailVerification(true)
            }).catch(() => {
                setUnknownError('There has been an unknown error')
            });
        }
    } 
  }

  return (
        <div className="min-h-screen font-sans dark bg-trueGray-900">
        <Head>
            <title>SheCrushes - Settings</title>
            <meta
                name="description"
                content="Change your account settings. Stream new XXX tube gifs and browse different sex gif categories."
                key="desc"
            />
            <meta
                property="og:title"
                content='SheCrushes - Settings'
            />
            <meta
                property="og:description"
                content="Change your account settings. Stream new XXX tube gifs and browse different sex gif categories."
            />
            <meta
                property="og:image"
                content="/open-graph.png"
            />
        </Head>

        {/* Navbar */}
        <Navbar />
        <MobileNavbar />

        {!user &&
            <div className="absolute min-h-screen mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" >
                <MainVideoLoader />
            </div>
        }
        
        {user && 
            <>
                <div className="max-w-5xl min-h-screen px-4 mx-auto sm:px-6 lg:px-8">
                    {/* Page Title */}
                    <h1 className="my-8 text-3xl font-semibold text-trueGray-200"> 
                        Settings
                    </h1>

                    {/* Unknown Error */}
                    <AnimatePresence initial={false}>
                        {unknownError && <FormError errorMessage={unknownError} />}
                    </AnimatePresence>
                            
                    {/* Email Field */}
                    <div className='my-3'>
                        <span className="block mb-1.5 text-trueGray-200">
                            Email <span className='text-sm'>{!user.emailVerified ? '(Not verified)' : '(Verified)' }</span>
                        </span>
                        <input 
                            className='form-input'
                            placeholder={user.email || 'Error'}
                            type="email" 
                            disabled
                            id="email"
                            name="email"
                        />

                        {/* Verify Email */}
                        <div className='mt-3'>
                            <div className='flex flex-row'>
                                {!user.emailVerified &&
                                    <div className='flex flex-row items-center group' onClick={() => verifyEmail()}>
                                        {/* If there is an email message, tell that user that the
                                        verification email has been sent */}
                                        {emailMessage ? 
                                            <svg className="w-6 h-6 mr-2 text-pink-500 group-hover:text-[#ff63b1]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        :
                                            <svg className="w-6 h-6 mr-2 text-pink-500 group-hover:text-[#ff63b1]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        }
                                        <p className='font-medium text-pink-500 cursor-pointer group-hover:text-[#ff63b1]'>
                                            {emailMessage ? emailMessage : 'Verify Email'}
                                        </p>

                                        {/* Loader */}
                                        <AnimatePresence initial={false}>
                                            {emailVerifyLoader ? <div className='mt-1 ml-3'>
                                                <ButtonLoader colour={true} />
                                            </div> : null}
                                        </AnimatePresence>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        }
    </div>
  )
}

export default Settings
