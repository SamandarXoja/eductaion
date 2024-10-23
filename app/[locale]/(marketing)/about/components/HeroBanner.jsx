"use client";

import React, { useEffect, useRef } from "react";

import { LayoutGrid } from "lucide-react";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

function HeroBanner({ data }) {
  const params = useParams();
  const translations = useTranslations(params.locale);
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
    <section className="content bg-customGray py-[120px]">
      <div
        ref={elementRef}
        className="mx-auto max-w-[856px] text-center opacity-0"
      >
        <div className="bg"></div>
        <div className="mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-[7px]">
          <LayoutGrid color="#fff" />
          <span className="text-sm font-medium text-white">
            {translations.common?.about_us}
          </span>
        </div>

        <h1 className="text-6xl font-semibold leading-[120%] xs:px-6 xs:text-[48px] sm:px-0 sm:text-[48px] md:px-0 md:text-[48px] lg:px-0 lg:text-[68px] xl:px-0 xl:text-[68px] 2xl:px-0 2xl:text-[68px]">
          {data.banner?.title}
        </h1>

        <p className="text-gray-500 mx-auto mt-4 max-w-[690px] text-lg">
          {data.banner?.description}
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
