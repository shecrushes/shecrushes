import { NextPage } from "next";
import Link from 'next/link'
import ContentLoader from "react-content-loader"

const SkeletonLoader: NextPage = () => {
    return (
        <div className="mb-12">
            <ContentLoader 
                speed={2}
                width={1216}
                height={470}
                viewBox="0 0 1216 470"
                backgroundColor="#202020"
                foregroundColor="#404040"
            >
                <rect x="3" y="7" rx="3" ry="3" width="1216" height="374" /> 
                <rect x="3" y="400" rx="5" ry="5" width="1216" height="64" />
            </ContentLoader>
        </div>
    )
}

export default SkeletonLoader