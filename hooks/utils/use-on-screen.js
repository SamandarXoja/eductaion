import { useEffect, useRef, useState } from "react";

const useOnScreen = (ref) => {
  const observerRef = useRef(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting),
    );
  }, []);

  useEffect(() => {
    observerRef?.current?.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
};

export default useOnScreen;
