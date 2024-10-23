"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

function HeroPartners({ dataPartnersPage }) {
  const { data } = dataPartnersPage;
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
  }, [elementRef, isOnScreen]);

  return (
    <section className="bg-customGray py-20  text-center">
      <div ref={elementRef} className="opacity-0">
        <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-[5px]">
          <Image
            src="/icons/data.svg"
            width={18}
            height={18}
            alt="data logo"
            priority
          />
          <span className="text-white">
            {translations.common?.for_partners}
          </span>
        </div>
        <h1 className="2xltext-[68px] mx-auto mt-4 w-full max-w-[900px] px-[15px] text-center font-semibold leading-[120%] xs:text-[40px] sm:text-[48px] md:text-[68px] lg:text-[68px] xl:text-[68px]">
          {data?.attributes?.banner?.title}
        </h1>

        <p className="mx-auto mt-4 w-full max-w-[840px] px-[15px] text-center text-lg text-customSilver">
          {data?.attributes?.banner?.description}
        </p>
      </div>
    </section>
  );
}

export default HeroPartners;
