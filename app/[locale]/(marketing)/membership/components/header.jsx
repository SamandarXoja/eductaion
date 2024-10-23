"use client";

import { useEffect, useRef } from "react";

import { Database } from "lucide-react";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Header({ subtitle, title, description }) {
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
    <div ref={elementRef} className="text-center opacity-0">
      <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 ">
        <Database className="h-5 w-5 text-white" />
        <span className="text-sm font-medium text-white">{subtitle}</span>
      </div>
      <h1 className="mb-4 mt-4 font-semibold xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl">
        {title}
      </h1>
      <p className="text-gray-500 text-lg sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-lg">
        {description}
      </p>
    </div>
  );
}

export default Header;
