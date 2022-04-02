import React, { useState, useEffect, Fragment, useContext } from 'react'
import { NextPage } from "next";
import { useRouter } from 'next/router';
import Link from 'next/link'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'

// Context
import AuthContext from '../../context/AuthContext'

// types
type Props = {
  open:boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileSideNav: NextPage<Props> = (props) => {
  // User context
  const { user, signOutUser } = useContext(AuthContext)

  // State
  const router = useRouter();
  const [pagePath, setPagePath] = useState('')
  
  useEffect(() => {
    setPagePath(router.pathname)
  }, [])

  // Sign out
  const logOutUser = () => {
    signOutUser()
  }
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-20 overflow-hidden" onClose={props.setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          {/* Colour overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-opacity-75 bg-trueGray-700" />
          </Transition.Child>
          
          {/* Main Content menu */}
          <div className="fixed inset-y-0 left-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-screen">
                {/* Close Button */}
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 flex px-5 py-5 mt-1">
                    <button
                      className='bg-transparent border-0 outline-none cursor-pointer text-trueGray-100' 
                      onClick={() => props.setOpen(false)}
                      data-cy="CloseMobileMenu"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="block h-7 w-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                  </div>
                </Transition.Child>

                {/* Menu Content */}
                <div className="flex flex-col h-full shadow-xl bg-trueGray-800">
                  {/* Menu Logo */}
                  <div className="flex items-center px-5 py-5 mt-1">
                    <Link href='/' passHref>
                      <a data-cy="navbarMobileLogo">
                        <Image
                          className="block w-auto ml-7 sm:ml-0"
                          src="/logo.svg"
                          alt="SheCrushes"
                          width={143}
                          height={30}
                          priority={true}
                        />
                      </a>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div style={{borderBottom: '3px solid #3f3f46'}}></div>

                  {/* Menu Items */}
                  <div className="relative flex-1 px-6 mt-3 overflow-auto">
                    <div className="absolute inset-0 px-6">
                      {/* General section */}
                      <div>
                        <div className="h-full">
                          {/* Subtitle */}
                          <h2 className='font-medium text-trueGray-100'>General</h2>

                          {/* Feed page */}
                          <div className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" >
                              <Link href={'/'} passHref>
                                <a className={`flex items-center cursor-pointer group no-underline`}>
                                  {pagePath === '/' ? 
                                    <svg 
                                      className={`w-6 h-6 mr-2 text-pink-500 group-hover:text-pink-600`} 
                                      viewBox="0 0 24 24"  
                                      fill="none"
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    >  
                                      <circle cx="12" cy="12" r="10" />  
                                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                    </svg>
                                  :            
                                    <svg 
                                      className={`w-6 h-6 mr-2 text-trueGray-100 group-hover:text-trueGray-300`} 
                                      viewBox="0 0 24 24"  
                                      fill="none"
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    >  
                                      <circle cx="12" cy="12" r="10" />  
                                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                                    </svg>
                                  } 
                                  <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                    Feed
                                  </p>
                                </a>
                              </Link>
                          </div>

                          {/* Explore */}
                          <div 
                            className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" 
                          >
                            <Link href={'/explore'} passHref>
                              <a className='flex items-center no-underline cursor-pointer group'>
                                  {pagePath === '/explore' ? 
                                    <svg 
                                      className={`w-6 h-6 mr-2 text-pink-500 group-hover:text-pink-600`} 
                                      viewBox="0 0 24 24"  
                                      fill="none"
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    >  
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                    </svg>
                                  :            
                                    <svg 
                                      className={`w-6 h-6 mr-2 text-trueGray-100 group-hover:text-trueGray-300`} 
                                      viewBox="0 0 24 24"  
                                      fill="none"
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    >  
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                                    </svg>
                                  }
                                  <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                    Explore
                                  </p>
                              </a>
                            </Link>
                          </div>

                          {/* Categories */}
                          <div 
                            className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" 
                          >
                            <Link href={'/categories'} passHref>
                              <a className='flex items-center no-underline cursor-pointer group'>
                                {pagePath === '/categories' ? 
                                  <svg 
                                    className="w-6 h-6 mr-2 text-pink-500 group-hover:text-pink-600" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="2" 
                                    stroke="currentColor" 
                                    fill="none" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >  
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <rect x="4" y="4" width="5" height="5" rx="1" />  
                                    <rect x="4" y="14" width="5" height="5" rx="1" /> 
                                    <rect x="14" y="14" width="5" height="5" rx="1" />  
                                    <rect x="14" y="4" width="5" height="5" rx="1" />
                                  </svg>
                                :            
                                  <svg 
                                    className="w-6 h-6 mr-2 text-trueGray-100 group-hover:text-trueGray-300" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="2" 
                                    stroke="currentColor" 
                                    fill="none" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  >  
                                    <path stroke="none" d="M0 0h24v24H0z"/>  
                                    <rect x="4" y="4" width="6" height="6" rx="1" />  
                                    <rect x="4" y="14" width="6" height="6" rx="1" /> 
                                    <rect x="14" y="14" width="6" height="6" rx="1" />  
                                    <rect x="14" y="4" width="6" height="6" rx="1" />
                                  </svg>
                                }
                                <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                  Categories
                                </p>
                              </a>
                            </Link>
                          </div>

                        </div>
                      </div>
                      
                      {/* Account section */}
                      {user ?  
                        <div>
                          <div className='h-full mt-4'>
                            {/* Subtitle */}
                            <h2 className='font-medium text-trueGray-100'>Account</h2>

                            {/* Account page */}
                            <div className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" data-cy="ProfileItem">
                              <Link href={'/profile'} passHref>
                                <a className={`flex items-center cursor-pointer group no-underline`}>
                                  <svg className={`w-6 h-6 mr-2 ${pagePath === '/profile' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2.5"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                  <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                    Profile
                                  </p>
                                </a>
                              </Link>
                            </div>

                            {/* Settings Page */}
                            <div className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" data-cy="SettingsItem">
                              <Link href={'/settings'} passHref>
                                <a className={`flex items-center cursor-pointer group no-underline`}>
                                  <svg style={{width: '1.45rem', height: '1.45rem'}} className={`mr-2 ${pagePath === '/settings' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                  <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                    Settings
                                  </p>
                                </a>
                              </Link>
                            </div>

                            {/* Sign out */}
                            <div className="block px-4 py-3.5 my-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" data-cy="SignoutItem">
                              <div 
                                onClick={() => logOutUser()}
                                className={`flex items-center cursor-pointer group no-underline`}
                              >
                                <svg style={{width: '1.45rem', height: '1.45rem'}} className={`mr-2 text-trueGray-100 group-hover:text-trueGray-300`} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
                                <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                  Sign out
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        :
                        <div className='h-full mt-4'>
                          {/* Subtitle */}
                          <h2 className='font-medium text-trueGray-100'>Account</h2>

                          {/* Account page */}
                          <div className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" >
                            <Link href={'/signin'} passHref>
                              <a className={`flex items-center cursor-pointer group no-underline`}>
                                <svg className={`w-7 h-7 mr-2 ${pagePath === '/signin' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M20 12h-13l3 -3m0 6l-3 -3" /></svg>
                                <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                  Sign in
                                </p>
                              </a>
                            </Link>
                          </div>
                          
                          {/* Sign in */}
                          <div className="block px-4 py-3.5 mt-3 text-sm font-semibold rounded drop-shadow-lg text-trueGray-100 bg-trueGray-700 focus:text-trueGray-300 focus:bg-trueGray-600 focus:outline-none focus:drop-shadow-none" >
                            <Link href={'/signup'} passHref>
                              <a className={`flex items-center cursor-pointer group no-underline`}>
                                <svg className={`w-6 h-6 mr-2 ${pagePath === '/signup' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2.5"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                                <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                                  Sign up
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      }

                      {/* App info */}
                      <div className='p-2 pt-6 text-xs font-semibold text-center text-trueGray-300'>Version: 1.1.0</div>
                      <div className='p-2 pt-0 text-xs font-semibold text-center text-pink-400'>
                        Made by Cats on Keyboards
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default MobileSideNav;