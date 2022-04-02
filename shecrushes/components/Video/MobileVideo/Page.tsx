import { motion, MotionStyle, MotionValue, PanInfo } from "framer-motion";
import React, { FunctionComponent } from "react";

// Types
interface PageProps {
  index: number;
  renderPage: (props: { index: number }) => JSX.Element;
  y: MotionValue;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
}

const pageStyle: MotionStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

const Page: FunctionComponent<PageProps> = ({
  index,
  renderPage,
  y,
  onDragEnd,
}) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        ...pageStyle,
        y,
        // Lay pages top and bottom on top of each other
        top: `${index * 100}%`,
        bottom: `${index * 100}%`,
      }}
      draggable
      drag="y"
      dragElastic={1}
      onDragEnd={onDragEnd}
    >
      {child}
    </motion.div>
  );
};

export default Page
