import { useRouter } from 'next/router';
import React, { useState, useContext, FunctionComponent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Context
import AuthContext from '../../context/AuthContext'

// Components
import { MobileSideNav, VideoTag } from '..'

// Types
interface Props {
  category?: string
}

const MobileFeedNavbar: FunctionComponent<Props> = (props: Props) => {
  const router = useRouter();

  // User context
  const { user } = useContext(AuthContext)

  // State
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="z-40 block md:hidden">
        {/* Mobile Side Nav */}
        <MobileSideNav open={open} setOpen={setOpen}/>

        {/* Main Navbar */}
        <nav className="absolute top-0 z-10 w-full bg-transparent">
          <div 
            className='flex items-center justify-between px-5 py-5 mx-auto align-center lg:justify-around lg:py-4 lg:px-0' 
          >
            {/* Back to previous page button */}
            {props.category ? 
              <div className="block lg:hidden">
                <a
                  onClick={() => router.back()} 
                  className='flex flex-row items-center no-underline'
                >
                  {/* Back Icon */}
                  <svg className="w-8 h-8 mr-3 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd"></path></svg>

                  {/* Tag */}
                  <VideoTag 
                    tag={props.category}
                    notFocusable={false}
                    background={true}
                    noMargin={true}
                  />
                </a>  
              </div>   
            :
              null
            }
            
            {/* Logo */}
            {!props.category ? 
              <div className="flex items-center">
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
              : 
              null
            }

            {/* Right Items */}
            <div className="flex items-center align-center lg:hidden">
              {/* Account button */}
              <Link href={user ? '/profile' : '/signin'} passHref>
                <a>
                  <div className="flex items-center mr-5 lg:hidden">
                    <svg className="w-6 h-6 text-trueGray-100"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2.5"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
                  </div>
                </a>
              </Link>

              {/* Menu button */}
              <button 
                data-cy="MobileFeedOpenMenu" 
                className="mt-1 bg-transparent border-0 cursor-pointer"
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

export default MobileFeedNavbar;