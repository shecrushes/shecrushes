import { useEffect, useState } from 'react'

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(0);
    
    const handleWindowSizeChange = () => {
        if(typeof window !== "undefined") {
            setWidth(window.innerWidth);
        }
    }

    useEffect(() => {

        setWidth(window.innerWidth)
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}

export default useCheckMobileScreen