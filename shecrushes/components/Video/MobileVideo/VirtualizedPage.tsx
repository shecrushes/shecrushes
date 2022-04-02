import { useState, useRef, useEffect } from "react";
import {
  animate,
  AnimationOptions,
  motion,
  MotionStyle,
  PanInfo,
  useMotionValue,
} from "framer-motion";

// Components
import { Page } from '../../';

// Types
interface VirtualizedPageProps {
  children: (props: { index: number }) => JSX.Element;
  fetchMoreVideos: () => void
}

const range = [-1, 0, 1];

// Styles
const containerStyle: MotionStyle = {
  width: "100%",
  height: "100%",
  overflowX: "hidden",
};

const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0,
  mass: 0.1,
  velocity: 50 
};

export const VirtualizedPage: React.FunctionComponent<VirtualizedPageProps> = ({
  children,
  fetchMoreVideos,
}) => {
  // To add the drag behaviour, we will need to keep all the items in sync with each other
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const calculateNewY = () => {
    return -index * (containerRef.current?.offsetHeight || 0);
  }

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const clientHeight = containerRef.current?.offsetHeight || 0;

    const { offset, velocity } = dragProps;

    //
    if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
      animate(y, calculateNewY(), transition);
      return;
    }

    // This will update the index when the user drags more than 1/4
    // of the width of the container
    if (offset.y > clientHeight / 4) {
      setIndex(index - 1);
    } else if (offset.y < -clientHeight / 4) {
      // Fetch next video
      fetchMoreVideos()
      
      setIndex(index + 1);
    } else {
      animate(y, calculateNewY(), transition);
    }
  };

  useEffect(() => {
    const controls = animate(y, calculateNewY(), transition);
    return controls.stop;
  }, [index]);

  return (
    <motion.div id="container" className="select-none hide-scrollbar" ref={containerRef} style={containerStyle}>
        {range.map((rangeValue) => {
          return (
            <Page
              key={rangeValue + index}
              y={y}
              onDragEnd={handleEndDrag}
              index={rangeValue + index}
              renderPage={children}
            />
          );
        })}
    </motion.div>
  );
};

export default VirtualizedPage