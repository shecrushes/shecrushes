import { FC, Fragment, useContext } from "react";
import { useRouter } from "next/router";
import { Menu, Transition } from '@headlessui/react'

// Context
import AuthContext from '../../context/AuthContext'

const ProfileDropdownMenu: FC = () => {  
  const { signOutUser } = useContext(AuthContext)
  const router = useRouter()

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  // Sign out
  const logOutUser = () => {
    signOutUser()
  }

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex bg-transparent border-none cursor-pointer">
          <span className="sr-only">Open user menu</span>
          <svg className="w-6 h-6 text-trueGray-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items static className="absolute right-0 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-trueGray-800 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => router.push('/settings')}
                className={classNames(active ? 'bg-trueGray-700 cursor-pointer' : '', 'flex items-center no-underline font-medium px-4 py-3 text-trueGray-100')}
              >
                <svg className={`mr-2 w-5 h-5 text-trueGray-100 group-hover:text-trueGray-300`}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                Settings
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={() => logOutUser()}
                className={classNames(active ? 'bg-trueGray-700 cursor-pointer' : '', 'flex items-center no-underline font-medium px-4 py-3 text-trueGray-100')}
              >
                <svg className={`mr-2 w-5 h-5 text-trueGray-100 group-hover:text-trueGray-300`} viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />  <polyline points="16 17 21 12 16 7" />  <line x1="21" y1="12" x2="9" y2="12" /></svg>
                Sign out
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdownMenu
