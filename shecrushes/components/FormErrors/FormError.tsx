import { NextPage } from "next";
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

type Props = {
    errorMessage: string
}

const FormError: NextPage<Props> = (props: Props) => {
    return (
        <AnimatePresence initial={false}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

                transition={{ duration: 0.1 }}
            >
                <div className="mt-1.5">
                    <p className="text-sm text-rose-500">
                        {props.errorMessage}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default FormError