import { useEffect, useState, useContext } from 'react';

// Firebase
import {app} from '../firebase.config';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

// Context
import AuthContext from '../context/AuthContext'

const useAuthListener = () => {
    const { ableToRedirect } = useContext(AuthContext)
    
    // assume user to be logged out
    const [loggedIn, setLoggedIn] = useState(false);

    // keep track to display a spinner while auth status is being checked
    const [checkingStatus, setCheckingStatus] = useState(true);

    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && ableToRedirect) {
                // https://firebase.google.com/docs/reference/js/firebase.User
                setLoggedIn(true)
            } else {
                // User is signed out
                setLoggedIn(false)
            }

            setCheckingStatus(false);
        });
        return () => unsubscribe();
    }, [])

    return { loggedIn, checkingStatus };
}

export default useAuthListener;