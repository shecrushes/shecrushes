import { NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Context
import AuthContext from '../../context/AuthContext'

// Components
import { MobileSideNav } from '..'

const MobileNavbar: NextPage = () => {
  // User context
  const { user } = useContext(AuthContext)
  
  // State
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const [pagePath, setPagePath] = useState('')
  
  useEffect(() => {
    setPagePath(router.pathname)
  }, [])

  return (
    <>
      <header className="block md:hidden">
        {/* Mobile Side Nav */}
        <MobileSideNav open={open} setOpen={setOpen}/>

        {/* Main Navbar */}
        <nav>
          <div 
            className='flex justify-between px-5 py-5 mx-auto lg:justify-around lg:py-4 lg:px-0 bg-trueGray-800' 
            style={{borderBottom: '2px solid #3f3f46'}}
          >

            {/* Search bar */}
            <div className="flex items-center lg:hidden"></div>

            {/* Logo */}
            <div className="flex items-center ml-14">
              <Link href='/' passHref>
                <a data-cy="navbarLogo">
                  <Image
                    className="block w-auto"
                    src="/logo.svg"
                    alt="SheCrushes"
                    width={143}
                    height={30}
                    priority={true}
                  />
                </a>
              </Link>
            </div>

            {/* Navbar right items*/}
            <div className="flex items-center lg:hidden">
              {/* Account button */}
              <Link href={user ? '/profile' : '/signin'} passHref>
                <a>
                  <div className="flex items-center mr-5 lg:hidden">
                    <svg className={`w-6 h-6 ${pagePath === '/profile' ? 'text-pink-500 group-hover:text-pink-600' : 'text-trueGray-100 group-hover:text-trueGray-300'}`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2.5"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </a>
              </Link>

              {/* Mobile menu button */}
              <button 
                data-cy="OpenMobileMenu" 
                className="text-pink-500 bg-transparent border-0 cursor-pointer"
                onClick={() => setOpen((val) => !val)}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-7 w-7 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
};

export default MobileNavbar;