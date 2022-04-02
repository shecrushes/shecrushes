import { NextPage } from "next";
import { Fragment, useState, useRef, KeyboardEvent } from 'react';
import { ShareIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'

interface Props {
    id: string
}

const DesktopShare: NextPage<Props> = (props) => {
    // State
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(true)
    const [copyButtonVal, setCopyButtonVal] = useState<string>('Copy')
    const inputRef = useRef<HTMLInputElement>(null)

    // Modal
    const closeModal = () => {
      setIsOpen(false)
      setCopyButtonVal('Copy')
    }

    const openModal = () => {
      setIsOpen(true)
      setCopyButtonVal('Copy')
    }

    // Copy link to clipboard
    const copyLink = () => {
      if(inputRef.current) {
        // Select input text
        inputRef.current.select();

        // Copy text to clipboard
        navigator.clipboard.writeText('https://shecrushes.com/watch/' + props.id)

        // Change button copy state
        setCopyButtonVal((val) => val === 'Copy' ? 'Copied' : 'Copy')
      } 
    }

    const copyLinkToKeyboard = (e?: KeyboardEvent<HTMLDivElement>) => {
      if(inputRef.current && e?.code === 'Enter') {
        // Select input text
        inputRef.current.select();

        // Copy text to clipboard
        navigator.clipboard.writeText('https://shecrushes.com/watch/' + props.id)

        // Change button copy state
        setCopyButtonVal((val) => val === 'Copy' ? 'Copied' : 'Copy')
      } 
    }

    return (
    <>
      <button 
        data-cy="ShareVideo" 
        onClick={openModal} 
        type="button" 
        className="bg-transparent border-0 cursor-pointer "
      >
        <span className="sr-only">Share video</span>
        <ShareIcon className="w-8 h-8 text-trueGray-100" aria-hidden="true" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center backdrop-blur-sm bg-trueGray/30">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-xl bg-trueGray-800 drop-shadow-xl">
                <div className="flex items-center space-between">
                    <Dialog.Title
                        as="h3"
                        className="text-xl font-medium leading-6 text-trueGray-200"
                    >
                        Share this video
                    </Dialog.Title>

                    <button 
                      type="button" 
                      onClick={closeModal} 
                      className="text-gray-400 border-0 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-trueGray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                      data-cy="CloseShareVideo"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-trueGray-300">
                    Copy link
                  </p>

                    <div className="relative mt-3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-trueGray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <input 
                            ref={inputRef}
                            readOnly
                            type="text" 
                            id="email-adress-icon" 
                            className={`
                                bg-transparent 
                                placeholder-trueGray-400
                                border-0
                                ring-2
                                ring-trueGray-500
                                text-white 
                                text-sm
                                rounded-lg 
                                focus:ring-pink-500
                                focus:ring-2
                                block 
                                w-full 
                                pl-10
                                ${copyButtonVal === 'Copied' ? 'pr-28' : 'pr-20'}
                                pr-20
                                p-2.5   
                                select-all
                                truncate ...
                            `}
                            value={'https://shecrushes.com/watch/' + props.id}
                        />
                        <div 
                          onClick={() => copyLink()} 
                          onKeyDown={(e) => copyLinkToKeyboard(e)}
                          className="absolute inset-y-0 right-0 flex items-center p-1 px-4 m-1 bg-pink-600 rounded-md cursor-pointer hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
                          tabIndex={0}
                          data-cy="CopyShareVideo"
                        >
                          <Transition
                            as={Fragment}
                            show={isCopied}
                            enter="transition-opacity duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="flex items-center text-sm font-medium text-white">
                              {copyButtonVal}
                              {copyButtonVal === 'Copied' ? 
                                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                : 
                                null
                              }
                            </div>
                          </Transition>
                        </div>
                   </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
    )
}

export default DesktopShare