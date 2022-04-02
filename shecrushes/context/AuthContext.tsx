import { createContext } from 'react';

import type { User } from './types/UserType';

// Types
interface IAuthContextContext {
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  signOutUser: () => void;

  userToken: string,
  setUserToken: (token: string) => void

  ableToRedirect: boolean, 
  setAbleToRedirect: (val: boolean) => void,

  loggedIn: boolean,
  checkingStatus: boolean
}
const defaultState = {
  // User
  user: null,
  setUser: () => {},
  signOutUser: () => {},

  userToken: '',
  setUserToken: () => {},

  ableToRedirect: false, 
  setAbleToRedirect: () => {},

  loggedIn: false,
  checkingStatus: true
};

// Create search context
const AuthContext = createContext<IAuthContextContext>(defaultState);

export default AuthContext;