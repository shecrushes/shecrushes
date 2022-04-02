import { NextPage } from "next";
import Link from 'next/link';

const Footer: NextPage= () => {
    return (
        <footer 
            className="flex px-5 py-6 mx-auto mt-8 lg:py-4 lg:px-0 bg-trueGray-800"
            style={{borderTop: '2px solid #3f3f46'}}
        >
            
            <div className="container flex flex-wrap mx-auto md:justify-between">
                <p className="pb-3 mx-auto my-auto text-sm font-medium md:pb-0 text-trueGray-400">
                    © Copyright {new Date().getFullYear()} by SheCrushes. All rights reserved.
                </p>

                <div className="flex items-center mx-auto">
                    {/* Socials */}
                    <Link href={'https://twitter.com/SheCrushes'} passHref>
                        <a className="mt-1.5 mx-2 font-medium no-underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500 hover:text-pink-600" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                            </svg>
                        </a>
                    </Link>

                    <Link href={'https://www.reddit.com/r/shecrushes_'} passHref>
                        <a className="mx-2 mt-1 font-medium no-underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500 hover:text-pink-600"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z" />
                                <path d="M12 8l1 -5l6 1" />
                                <circle cx="19" cy="4" r="1" />
                                <circle cx="9" cy="13" r=".5" fill="currentColor" />
                                <circle cx="15" cy="13" r=".5" fill="currentColor" />
                                <path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5" />
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer