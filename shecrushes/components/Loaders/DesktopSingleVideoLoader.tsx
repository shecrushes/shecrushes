import React, { FunctionComponent } from 'react'
import dynamic from "next/dynamic";

const ContentLoader = dynamic(() => import('react-content-loader'), {
  ssr: false
})

const DesktopSingleVideoLoader: FunctionComponent = () => {
    return (
        <div className='flex justify-center'>
            <ContentLoader 
                speed={2}
                width={310}
                height={549}
                viewBox="0 0 310 549"
                backgroundColor="#27272a"
                foregroundColor="#3f3f46"
            >
                <rect x="2" y="0" rx="7" ry="7" width="305" height="530" />
            </ContentLoader>
        </div>
    )
}

export default DesktopSingleVideoLoader