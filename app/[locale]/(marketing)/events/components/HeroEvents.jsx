"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

function HeroEvents({ heroData }) {
  const params = useParams();
  const translations = useTranslations(params.locale);
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const isHeaderOnScreen = useOnScreen(headerRef);
  const isImageOnScreen = useOnScreen(imageRef);

  useEffect(() => {
    if (isHeaderOnScreen) {
      headerRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [headerRef, isHeaderOnScreen]);

  useEffect(() => {
    if (isImageOnScreen) {
      imageRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__bounceIn",
      );
    }
  }, [imageRef, isImageOnScreen]);

  return (
    <section>
      <div className="mx-auto mt-16 w-full max-w-[1194px] px-6">
        <div ref={headerRef} className="opacity-0">
          <div className="flex w-full max-w-[135px] items-center justify-center gap-2 rounded-[1000px] bg-primary py-[6px]">
            <Image
              src="/icons/earth.svg"
              width={18}
              height={18}
              priority
              alt="icon events"
            />
            <span className="text-sm text-white">
              {translations.common?.events}
            </span>
          </div>
          <h1 className="mt-4 font-semibold xs:text-[48px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[68px]">
            {heroData.data.attributes.title}
          </h1>
          <p className="w-full max-w-[746px] text-customSilver xs:text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">
            {heroData.data.attributes.description}
          </p>
        </div>

        {heroData?.data?.attributes?.image?.data?.attributes?.url && (
          <div ref={imageRef} className="animate__delay-1s mt-16 opacity-0">
            <Image
              className="w-full"
              src={`https://admin.it-ea.uz${heroData?.data?.attributes?.image?.data?.attributes?.url}`}
              width={1160}
              height={620}
              alt="Event image"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroEvents;
