import { NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon } from '@heroicons/react/outline'

// Context
import AuthContext from '../../context/AuthContext'

// Components
import { MobileSideNav, NavbarDropdownMenu } from '../../components'

const Navbar: NextPage = () => {
  const router = useRouter();

  // User context
  const { user } = useContext(AuthContext)

  // State
  const [pagePath, setPagePath] = useState('')
  const [open, setOpen] = useState(false)
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false)

  useEffect(() => {
    setPagePath(router.pathname)
  }, [])
  return (
    <>
      <header className="hidden md:block">
        {/* Mobile Side Nav */}
        <MobileSideNav open={open} setOpen={setOpen}/>

        {/* Main Navbar */}
        <nav>
          <div 
            className='flex justify-between px-5 py-6 mx-auto lg:justify-around lg:py-4 lg:px-0 bg-trueGray-800' 
            style={{borderBottom: '2px solid #3f3f46'}}
          >

            {/* Logo */}
            <div className="flex items-center">
              <Link href='/' passHref>
                <a data-cy="navbarLogo">
                  <Image
                    className="block w-auto ml-7 sm:ml-0"
                    src="/logo.svg"
                    alt="SheCrushes"
                    width={143}
                    height={32}
                    priority={true}
                  />
                </a>
              </Link>
            </div>

            {/* Left Section Desktop*/}
            <div className="items-center hidden space-x-8 lg:flex">
              {/* Feed page */}
              <Link href={'/'} passHref>
                <a 
                  className={`flex items-center cursor-pointer group no-underline`}
                  data-cy="FeedItem" 
                >
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

              {/* Explore page */}
              <Link href={'/explore'} passHref>
                <a 
                  className='flex items-center no-underline cursor-pointer group'
                  data-cy="ExploreItem" 
                >
                  {pagePath === '/explore' ? 
                    <svg 
                      className={`w-6 h-6 mr-1 text-pink-500 group-hover:text-pink-600`} 
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
                      className={`w-6 h-6 mr-1 text-trueGray-100 group-hover:text-trueGray-300`} 
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
              
              {/* Categories Page */}
              <Link href={'/categories'} passHref>
                <a 
                  className='flex items-center no-underline cursor-pointer group'
                  data-cy="CategoriesItem"
                >
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
                      <rect x="4" y="4" width="6" height="6" rx="1" />  
                      <rect x="4" y="14" width="6" height="6" rx="1" /> 
                      <rect x="14" y="14" width="6" height="6" rx="1" />  
                      <rect x="14" y="4" width="6" height="6" rx="1" />
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

            {/* User profile */}
            {user ? 
              <>
                {/* User profie - LARGE SCREEN*/}
                <div className="flex-row items-center hidden lg:flex">
                  <div onClick={() => setOpenProfileDropdown((prevVal) => !prevVal)}>
                    <a className="flex flex-row items-center no-underline cursor-pointer group">
                      <div className="flex items-center mr-3">
                        <svg 
                          className={`w-6 h-6 ${pagePath === '/profile' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  
                          viewBox="0 0 24 24"  
                          fill="none"  
                          stroke="currentColor"  
                          strokeWidth="2.5" 
                          strokeLinecap="round"  
                          strokeLinejoin="round"
                        >  
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="font-medium text-trueGray-100 group-hover:text-trueGray-300">
                        {user.displayName ? user.displayName : 'Anonymous'}
                      </div>
                    </a>

                    {/* Profile dropdown */}
                    <NavbarDropdownMenu 
                      openMenu={openProfileDropdown}
                      setOpenProfileDropdown={setOpenProfileDropdown}
                    />
                  </div>
                </div>

                {/* User profie - MEDIUM SCREEN*/}
                <div className="flex items-center lg:hidden">
                  <div onClick={() => setOpenProfileDropdown((prevVal) => !prevVal)}>
                    <a className="flex flex-row items-center no-underline cursor-pointer group">
                      <div className="flex items-center mr-3">
                        <svg 
                          className={`w-6 h-6 ${pagePath === '/profile' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  
                          viewBox="0 0 24 24"  
                          fill="none"  
                          stroke="currentColor"  
                          strokeWidth="2.5" 
                          strokeLinecap="round"  
                          strokeLinejoin="round"
                        >  
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="font-medium text-trueGray-100 group-hover:text-trueGray-300">
                        {user.displayName ? user.displayName : 'Anonymous'}
                      </div>
                    </a>

                    {/* Profile dropdown */}
                    <NavbarDropdownMenu 
                      openMenu={openProfileDropdown}
                      setOpenProfileDropdown={setOpenProfileDropdown}
                    />
                  </div>
                  
                  {/* Mobile menu button*/}
                  <button 
                    className="ml-6 bg-transparent border-0 cursor-pointer text-neutral-100"
                    onClick={() => setOpen((val) => !val)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="block h-7 w-7 text-trueGray-100" aria-hidden="true" />
                  </button>
                </div>
              </>
              :
              <>
                {/* Sign up / sign in */}
                <div className="flex flex-row items-center">
                  <Link href={'/signin'} passHref>
                    <a 
                      className='flex items-center mr-4 no-underline cursor-pointer group'
                      data-cy="Signin"
                    >
                      <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                        Sign in
                      </p>
                    </a>
                  </Link>

                  <Link href={'/signup'} passHref>
                    <a 
                      className='flex items-center no-underline h-9 btn-primary'
                      data-cy="Signup"
                    >
                      <p className="font-medium no-underline text-trueGray-100 group-hover:text-trueGray-300">
                        Sign up
                      </p>
                    </a>
                  </Link>

                  {/* Mobile menu button*/}
                  <div className="flex items-center ml-6 lg:hidden">
                    <button 
                      className="bg-transparent border-0 cursor-pointer text-neutral-100"
                      onClick={() => setOpen((val) => !val)}
                    >
                      <span className="sr-only">Open main menu</span>
                      <MenuIcon className="block h-7 w-7 text-trueGray-100" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
        </nav>
      </header>
    </>
  )
};

export default Navbar;