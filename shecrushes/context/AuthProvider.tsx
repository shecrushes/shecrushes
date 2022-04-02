import React, { useState, FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from './AuthContext';
import jwtDecode, { JwtPayload } from "jwt-decode";

// Types
import type { User } from './types/UserType';

// Firebase
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase.config';

export const AuthProvider: FC = ({ children }) => {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState('')
  const [ableToRedirect, setAbleToRedirect] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Hooks
  const auth = getAuth(app);
  const router = useRouter();

  // When the user state changes, update the state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser) {
        setUser({
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          emailVerified: auth.currentUser.emailVerified,
          uid: auth.currentUser.uid,

          creationTime: auth.currentUser.metadata.creationTime || '',
          lastSignInTime: auth.currentUser.metadata.lastSignInTime || ''
        })

        // Get id token
        auth.currentUser?.getIdToken(false).then(function(idToken) {
          setUserToken(idToken)
        }).catch(function(error) {
          console.log(error)
        })

        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }

      setCheckingStatus(false)
    });
    return () => unsubscribe();
  }, [])

  // Signout the user
  const signOutUser = () => {
    signOut(auth).then(() => {
      // Clear user
      setUser(null)
      router.push('/signin')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signOutUser,

        userToken, 
        setUserToken,

        ableToRedirect, 
        setAbleToRedirect,

        loggedIn,
        checkingStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}