import { NextPage } from "next";
import { useRouter }  from 'next/router';

// Components
import { VideoTag } from '../'

interface Props {
  category: string
}

const CurrentCategory: NextPage<Props> = (props: Props) => {
    const router = useRouter()

    return (
        <>
            <a
                onClick={() => router.back()} 
                className='flex flex-row items-center mt-8 no-underline cursor-pointer'
            >
                {/* Back Icon */}
                <svg 
                    className="mr-3 w-7 h-7 text-trueGray-100"  
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >  
                    <path stroke="none" d="M0 0h24v24H0z"/>  
                    <polyline points="15 6 9 12 15 18" />
                </svg>

               {/* Current category */}
                <VideoTag 
                    tag={props.category}
                    noMargin={true}
                    notFocusable={false}
                    background={true}
                />
            </a>  
        </>
    )
}

export default CurrentCategory