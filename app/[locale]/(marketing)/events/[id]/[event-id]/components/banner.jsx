"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Banner({ src }) {
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
    <Image
      ref={elementRef}
      className="mx-auto h-[520px] w-full max-w-[920px] object-cover opacity-0"
      src={src}
      width={920}
      height={520}
      alt="Banner"
      priority
    />
  );
}

export default Banner;
