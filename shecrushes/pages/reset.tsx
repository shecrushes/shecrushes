import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Context
import AuthContext from '../context/AuthContext'

// Firebase
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Components
import { 
  Navbar, 
  MobileNavbar,
  FormError,
  ButtonLoader,
  MainVideoLoader,
  Footer
} from '../components'

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Please provide an email'),
});

const Reset: NextPage = () => {  
  // User context
  const { user, loggedIn, setUser } = useContext(AuthContext)
  const auth = getAuth()

  // State  
  const router = useRouter()
  const [sentResetPassword, setSentResetPassword] = useState(false)
  const [formLoader, setFormLoader] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [unknownError, setUnknownError] = useState('')
  
  // Redirect user if they are already authenticated
  useEffect(() => {
    if(loggedIn) router.push('/profile')
  }, [loggedIn])

  // Formik config
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {      
      if(!sentResetPassword) {
        // Show loader
        setFormLoader(true)
        
        // Send email verification
        if(auth.currentUser !== null) {
          sendPasswordResetEmail(auth, values.email)
          .then(() => {
              setResetMessage('Password reset email sent!')
              setFormLoader(false)
              setSentResetPassword(true)
          }).catch((error) => {
            setUnknownError('There has been an unknown error. Please try again later.')
          });
        }
    } 
    },
    validateOnBlur: false,
    validateOnChange: false
  });
  
  return (
    <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes - Reset Password</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      {/* Show loader while checking the status */}
      {user &&
        <div className="absolute min-h-screen mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" >
          <MainVideoLoader />
        </div>
      }
      
      {/* If checking status is false then show the profile page */}
      {!user && 
        <>
          <form className="max-w-xl min-h-screen px-2 mx-auto my-8 sm:px-6 lg:px-8" onSubmit={formik.handleSubmit}>  
            {/* Sign up title */}
            <h4 className='text-3xl font-medium text-center text-trueGray-100'>
              Reset Password
            </h4>

            {/* Subtitle */}
            <div className='flex justify-center pt-3 mb-6 text-trueGray-400'> 
              <p>We will send you an email with a reset link</p>
            </div>

            {/* Unknown Error */}
            {unknownError && <FormError errorMessage={unknownError} />}


            {/* Email input */}
            <div className="my-3">
              <input 
                className='form-input'
                placeholder='Email'
                type="email" 
                autoComplete="on"

                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {/* Error */}
              {formik.errors.email ?  
                <FormError errorMessage={formik.errors.email} />
              :
                null
              }

              {/* Password reset message */}
              {resetMessage && 
                <div className='flex flex-row items-center mt-2'>
                  <svg className="w-6 h-6 mr-2 text-pink-500 group-hover:text-[#ff63b1]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                  <p className='font-medium text-pink-500 cursor-pointer group-hover:text-[#ff63b1]'>
                    {resetMessage}
                  </p>
                </div>
              }
            </div>
            
            {/* Sign up user */}
            <div className='mt-6'>
              <button 
                type="submit" 
                className='inline-flex items-center justify-center w-full shadow-lg align btn-primary'
              >
                Send
                
                {/* Loader */}
                {formLoader && 
                  <div className='ml-3'>
                    <ButtonLoader width={'5'} height={'5'}/>
                  </div>
                }
              </button>
            </div>
          </form>
        
          {/* Footer */}
          <Footer />
        </>
      }
    </div>
  )
}

export default Reset
