import { useEffect, useState } from "react";

const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState();

  useEffect(() => {
    if (ref.current) {
      const { x = 0, y = 0 } = ref.current?.getBoundingClientRect() || {};
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
        position: { x, y },
      });
    } else {
      setDimensions();
    }

    const onResize = () => {
      const { x = 0, y = 0 } = ref.current?.getBoundingClientRect() || {};
      setDimensions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
        position: { x, y },
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);

  return dimensions;
};

export default useDimensions;
