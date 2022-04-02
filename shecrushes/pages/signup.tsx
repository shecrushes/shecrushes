import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { AnimatePresence } from "framer-motion"
import { useFormik } from 'formik';
import * as Yup from 'yup';

import React from "react" 
React.useLayoutEffect = React.useEffect 

// Context
import AuthContext from '../context/AuthContext'

// Firebase
import { app, db} from '../firebase.config';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

// Components
import { 
  Navbar, 
  MobileNavbar,
  FormError,
  MainVideoLoader,
  ButtonLoader,
  Footer
} from '../components'

// Validation schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
  .min(6, 'Please make your username at least 6 characters')
  .max(15, 'Please make your username less than 15 characters')
  .matches(
    /^[a-zA-Z0-9_.-]*$/,
    'Please make sure your username contains only letters and numbers'
  ).required('Please provide a username'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Please provide an email'),
  password: Yup.string()
  .required('Please provide a password')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
    "Password must be 6 characters, 1 lowercase, 1 usercase and 1 number"
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Please make sure that the passwords match')

});

const SignUp: NextPage = () => {
  const env = process.env.NEXT_PUBLIC_ENV;
  const router = useRouter()

  // User status
  const { loggedIn, checkingStatus, ableToRedirect, setAbleToRedirect } = useContext(AuthContext)

  // State  
  const [formLoader, setFormLoader] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [unknownError, setUnknownError] = useState('')

  // Redirect user if they are already authenticated
  useEffect(() => {
    if(loggedIn && ableToRedirect) router.push('/profile')
  }, [loggedIn])

  // Formik config
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async(values) => {
      // Show loader
      setFormLoader(true)
      
      // Register user
      const auth = getAuth(app);
      
      // Check if username exists
      const docRef = doc(db, "users", values.username);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async(userCredential) => {
          // Signed in 
          const user = userCredential.user;

          // Insert username document into firebase
          try {
            await setDoc(doc(db, "users", values.username), {
              userId: user.uid,
            });
            
            // Update display name
            await updateProfile(user, {
              displayName: values.username
            }).then(() => {
              // Redirect user
              setFormLoader(false)
              setAbleToRedirect(true)
              router.push('/profile')
            })
          } catch (e) {
            setUsernameError('That username is already in use');
            setFormLoader(false);
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setEmailError('Email already in use.');
              setFormLoader(false);
              break;
            case 'auth/invalid-email':
              setEmailError('Enter a valid email.');
              setFormLoader(false);
              break;
            default:
              setUnknownError(error.message);
              setFormLoader(false);
          }
        }); 
      } else {
        setUsernameError('That username is already in use');
        setFormLoader(false);
      }
    },
    validateOnBlur: false,
    validateOnChange: false
  });
  
  return (
    <div className="min-h-screen font-sans dark bg-trueGray-900">
      <Head>
        <title>SheCrushes - Sign Up</title>
      </Head>

      {/* Navbar */}
      <Navbar />
      <MobileNavbar />

      <AnimatePresence initial={false}>
        {checkingStatus &&
          <div className="absolute min-h-screen mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-trueGray-800/50" >
            <MainVideoLoader />
          </div>
        }
      </AnimatePresence>

      {!checkingStatus &&
          <>
            <form className="max-w-xl min-h-screen px-2 mx-auto my-8 sm:px-6 lg:px-8" onSubmit={formik.handleSubmit}>  
              {/* Sign up title */}
              <h4 className='text-3xl font-medium text-center text-trueGray-100'>
                Sign Up
              </h4>

              {/* Subtitle */}
              <div className='flex justify-center pt-3 mb-6 text-trueGray-400'>
                <p>
                  Already have an account? 
                  <Link href='/signin' passHref>
                      <span className='ml-1 text-pink-500 cursor-pointer'>
                        <a>Sign in</a>
                      </span>
                  </Link>
                </p>
              </div>

              {/* Unknown Error */}
              {unknownError && <FormError errorMessage={unknownError} />}

              {/* Username input */}
              <div className="my-3">
                <input 
                  className='form-input'
                  placeholder={'Username'}
                  type="text" 
                  autoComplete="on"
                  id="username"
                  data-cy="UsernameInput"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />

                {/* Error */}
                {formik.errors.username || usernameError ?  
                  <FormError errorMessage={formik.errors.username || usernameError} />
                :
                  null
                }
              </div>

              {/* Email input */}
              <div className="mt-3">
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
                {formik.errors.password ?  
                  <FormError errorMessage={formik.errors.password} />
                  :
                  null
                }
              </AnimatePresence>

              {/* Confirm Password input */}
              <div className="mt-3">
                <input 
                  className='form-input'
                  placeholder='Confirm Password'
                  type="password" 
                  autoComplete="on"
                  data-cy="confirmPasswordInput"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>

              {/* Error */}
              {formik.errors.confirmPassword ?  
                <FormError errorMessage={formik.errors.confirmPassword} />
                :
                null
              }
              
              {/* Sign up user */}
              <div className='mt-6'>
                <button type="submit" className='inline-flex items-center justify-center w-full mr-3 shadow-lg btn-primary' data-cy="SignupButton">
                  Sign up
                  
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

export default SignUp
