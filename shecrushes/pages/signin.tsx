import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { AnimatePresence } from "framer-motion"
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Context
import AuthContext from '../context/AuthContext'

// Firebase
import { app } from '../firebase.config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
  password: Yup.string().required('Please provide a password')
});

const Login: NextPage = () => {
  // User context
  const { loggedIn, checkingStatus, setUser } = useContext(AuthContext)
  
  // State  
  const router = useRouter()
  const [formLoader, setFormLoader] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [unknownError, setUnknownError] = useState('')

  // Redirect user if they are already authenticated
  useEffect(() => {
    if(loggedIn) router.push('/profile')
  }, [loggedIn])

  // Formik config
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      // Show loader
      setFormLoader(true)
      
      // Signin user
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          
          // Hide loader, redirect to profile page
          if(user) {
            // Set user context
            const currentUser = auth.currentUser;
            
            if(currentUser !== null) {
              // Set user to context
              setUser({
                displayName: currentUser.displayName,
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
                uid: currentUser.uid,

                creationTime: currentUser.metadata.creationTime || '',
                lastSignInTime: currentUser.metadata.lastSignInTime || ''
              })
            }

            // Redirect user
            setFormLoader(false)
            router.push('/profile')
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/wrong-password':
              setPasswordError('Wrong password combination');
              setFormLoader(false);
              break;
            case 'auth/invalid-password':
              setPasswordError('Invalid password');
              setFormLoader(false);
              break;
            case 'auth/invalid-creation-time':
              setEmailError('Login must be a valid UTC date');
              setFormLoader(false);
              break;
            case 'auth/user-not-found':
              setEmailError('No user found with this email');
              setFormLoader(false);
              break;
            default:
              setUnknownError(error.message);
              setFormLoader(false);
          }
        });
    },
    validateOnBlur: false,
    validateOnChange: false
  });
  
  return (
    <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes - Sign In</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      {/* Show loader while checking the status */}
      {checkingStatus &&
        <div className="absolute min-h-screen mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" >
          <MainVideoLoader />
        </div>
      }
      
      {/* If checking status is false then show the profile page */}
      {!checkingStatus && 
        <>
          <form className="max-w-xl min-h-screen px-2 mx-auto my-8 sm:px-6 lg:px-8" onSubmit={formik.handleSubmit}>  
            {/* Sign up title */}
            <h4 className='text-3xl font-medium text-center text-trueGray-100'>
              Sign in
            </h4>

            {/* Subtitle */}
            <div className='flex justify-center pt-3 mb-6 text-trueGray-400'> 
              <p>{'Don\'t have an account?'}
                <Link href='/signup' passHref>
                  <span className='ml-1 text-pink-500 cursor-pointer'>
                    <a>Sign up</a>
                  </span>
                </Link>
              </p>
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
                data-cy="EmailInput"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />

              {/* Error */}
              {formik.errors.email || emailError ?  
                <FormError errorMessage={formik.errors.email || emailError} />
              :
                null
              }
            </div>

            {/* Password input */}
            <div className="mt-3">
              <input 
                className='form-input'
                placeholder='Password'
                type="password" 
                autoComplete="on"
                data-cy="PasswordInput"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            {/* Error */}
            <AnimatePresence initial={false}>
              {formik.errors.password || passwordError ?  
                <FormError errorMessage={formik.errors.password || passwordError} />
                :
                null
              }
            </AnimatePresence>


            {/* Forgot password */}
            <div className='flex justify-end mt-3'> 
              <Link href='/reset' passHref>
                <span className='ml-1 cursor-pointer text-trueGray-400'>
                  <a>Forgot password?</a>
                </span>
              </Link>
            </div>

            
            {/* Sign up user */}
            <div className='mt-4'>
                <button 
                  type="submit" 
                  data-sitekey="6LfUpLseAAAAAJy9y7ApELQA5daGFGddG5sgug9t"
                  data-callback='onSubmit'
                  className='inline-flex items-center justify-center w-full shadow-lg align btn-primary'
                  data-cy="SigninButton"
               >
                  Sign in
                  
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

export default Login
