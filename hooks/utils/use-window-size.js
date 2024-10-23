import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return size;
};

export default useWindowSize;
