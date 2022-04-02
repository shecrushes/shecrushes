import { NextPage } from "next";
import { motion } from "framer-motion"

type Props = {
    height?: number
}

const MainVideoLoader: NextPage<Props> = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            transition={{ duration: 0.3 }}
        >
            <div className="absolute mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg className="w-12 h-12 text-pink-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div> 
        </motion.div>
    )
}

export default MainVideoLoader