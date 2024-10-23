"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

function HeroBanner({ data }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
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
  }, [isOnScreen]);

  return (
    <section className="bg-[#FAFAFA]  xs:py-12 sm:py-[120px] md:py-[120px] lg:py-[120px] xl:py-[120px] 2xl:py-[120px]">
      <div
        ref={elementRef}
        className="mx-auto w-full max-w-[924px] px-6 text-center opacity-0"
      >
        <div className="mx-auto inline-flex justify-center gap-2 rounded-[1000px] bg-primary px-4 py-[6px]">
          <Image
            src="/icons/raitng.svg"
            width={18}
            height={18}
            priority
            alt="icon rating"
          />
          <span className="text-sm text-white">
            {translations.common?.rating}
          </span>
        </div>

        <h1 className="mt-4 text-center font-semibold leading-[120%] xs:text-[48px] sm:text-[68px] md:text-[68px] lg:text-[68px]  xl:text-[68px] 2xl:text-[68px]">
          {data.title}
        </h1>

        <p className="mx-auto mt-4 w-full max-w-[690px] text-center text-lg text-customSilver">
          {data.description}
        </p>
      </div>
    </section>
  );
}

export default HeroBanner;
