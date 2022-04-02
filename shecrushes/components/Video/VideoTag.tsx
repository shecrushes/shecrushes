import { NextPage } from "next";
import Link from 'next/link';

interface Props {
    tag: string
    background?: boolean
    notFocusable: boolean
    noMargin?: boolean
}

const VideoTag: NextPage<Props> = (props) => {
    // -------
    // Analytic events
    // -------


    return (
        <Link href={`/category/${props.tag}`} passHref>
            {props.notFocusable ? 
                <a 
                    className={`no-underline ${!props.noMargin ? 'mr-1.5 mt-1.5' : ''}`} 
                    tabIndex={-1}
                    data-cy='CategoryTag'
                >
                    <div className={` 
                        text-white 
                        py-[4px] px-[6px]
                        rounded
                        cursor-pointer'
                        ${
                        props.background ? 
                            'bg-pink-500 hover:bg-pink-600' 
                        : 
                            `
                            bg-[rgba(0,0,0,.1)] 
                            hover:bg-pink-500 
                            `
                        }
                    `}
                    >
                        <p className="items-center text-sm font-medium">
                            #{props.tag.toLowerCase()}
                        </p>
                    </div>
                </a>    
            :
                <a 
                    className={`no-underline ${!props.noMargin ? 'mr-1.5 mt-1.5' : ''}`} 
                    data-cy={props.tag.toLowerCase() + 'Tag'}
                >
                    <div className={` 
                        text-white 
                        py-[4px] px-[6px]
                        rounded
                        cursor-pointer'
                        ${
                        props.background ? 
                            'bg-pink-500 hover:bg-pink-600' 
                        : 
                            `
                            bg-[rgba(0,0,0,.1)] 
                            hover:bg-pink-500 
                            `
                        }
                    `}
                    >
                        <p className="items-center text-sm font-medium">
                            #{props.tag.toLowerCase()}
                        </p>
                    </div>
                </a>
            }
        </Link>
    )
}

export default VideoTag