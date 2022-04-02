import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  // useLayoutEffect fires after all DOM changes
  useEffect(() => {
    // Update data with window size
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    // Listen for resize event
    window.addEventListener('resize', updateSize);
    updateSize();

    // Unmount event listener
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default useWindowSize