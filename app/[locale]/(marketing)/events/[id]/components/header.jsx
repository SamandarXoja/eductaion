"use client";

import { useEffect, useRef } from "react";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Header({ title, description }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <div ref={elementRef} className="mb-[88px] pt-16 text-center opacity-0">
      <h1 className="mx-auto mb-4 w-full max-w-[856px] text-5xl font-semibold xs:text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
        {title}
      </h1>
      <p className="text-gray-400 mx-auto w-full max-w-[856px] text-lg xs:px-3">
        {description}
      </p>
    </div>
  );
}

export default Header;
