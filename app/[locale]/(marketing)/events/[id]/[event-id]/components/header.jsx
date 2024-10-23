"use client";

import { useEffect, useRef } from "react";

import { Calendar } from "lucide-react";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Header({ date, title, description }) {
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
    <div ref={elementRef} className="mt-24 text-center opacity-0">
      <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-[5px]">
        <Calendar color="#fff" size={18} />
        <span className="text-sm text-white">{date}</span>
      </div>
      <h1 className="mx-auto mb-4 mt-4 w-full max-w-[775px] text-[52px] font-semibold leading-[120%]">
        {title}
      </h1>
      <p className="mx-auto w-full max-w-[691px] text-customSilver">
        {description}
      </p>
    </div>
  );
}

export default Header;
