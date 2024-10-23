"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function BenefitItem({ benefit }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__bounceIn",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <div
      ref={elementRef}
      className="animate__delay-1s w-full max-w-[266px] text-center opacity-0"
    >
      <Image
        className="mx-auto  object-contain 2xl:h-[56px] 2xl:w-[56px]"
        src={`https://admin.it-ea.uz${benefit.icon?.data?.attributes?.url}`}
        alt={benefit.title}
        priority
        width={56}
        height={56}
      />
      <h3 className="text-2xl font-semibold text-[#0A0A0A] xl:mb-[0px] xl:mt-[6px] xl:text-[16px] 2xl:mb-3 2xl:mt-[24px] 2xl:text-2xl">
        {benefit.title}
      </h3>
      <p className="leading-[150%] text-[#737373] xl:text-[12px] 2xl:text-[15px]">
        {benefit.description}
      </p>
    </div>
  );
}

export default BenefitItem;
