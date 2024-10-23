"use client";

import { useEffect, useRef } from "react";

import { Award } from "lucide-react";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Header({ subtitle, title }) {
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
    <div ref={elementRef} className="pb-20 pt-20 text-center opacity-0">
      <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-[4px]">
        <Award color="#fff" />
        <span className="text-sm font-medium text-white">{subtitle}</span>
      </div>
      <h1 className="text-[52px] font-semibold text-customBlack">{title}</h1>
    </div>
  );
}

export default Header;
