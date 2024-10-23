"use client";

import { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Category({ category, translations, locale, index }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        index % 2 === 0 ? "animate__fadeInLeft" : "animate__fadeInRight",
      );
    }
  }, [index, elementRef, isOnScreen]);

  return (
    <Link href={`/${locale}/events/${category.id}`}>
      <div
        ref={elementRef}
        className="stars mx-auto flex w-full max-w-[1160px] flex-wrap border bg-white px-4 py-4 opacity-0 xs:justify-center xs:gap-6 sm:justify-center sm:gap-12 md:justify-center md:gap-12 lg:justify-center lg:gap-12 xl:justify-start xl:gap-12 2xl:justify-start 2xl:gap-12"
      >
        {category?.attributes?.image?.data?.attributes?.url && (
          <Image
            className="h-[350px] w-full max-w-[500px] object-cover"
            src={`https://admin.it-ea.uz${category?.attributes?.image?.data?.attributes?.url}`}
            width={500}
            height={350}
            alt={category.attributes.title[`title_${locale}`]}
            priority
          />
        )}
        <div className="flex w-full max-w-[556px] flex-col justify-around xs:max-w-[500px] xs:gap-5 sm:max-w-[500px] sm:gap-5 md:max-w-[500px] md:gap-5 lg:max-w-[500px] lg:gap-5 xl:max-w-[556px] xl:gap-0 2xl:max-w-[556px] 2xl:gap-0">
          <div>
            <h3 className="font-semibold xs:text-[24px] sm:text-[32px] md:text-[32px] lg:text-[32px] xl:text-[32px] 2xl:text-[32px]">
              {category.attributes.title[`title_${locale}`]}
            </h3>
            <p className="overflow-hidden text-customSilver xs:mt-3 xs:line-clamp-2 sm:mt-4 sm:line-clamp-none sm:h-auto">
              {category.attributes.description[`description_${locale}`]}
            </p>
          </div>
          <div className="mt-4 inline-flex w-full items-center justify-center gap-2 self-start rounded-full bg-primary py-[14px] pl-[30px] pr-5 sm:w-auto">
            <span className="font-semibold text-white">
              {translations?.learn_more}
            </span>
            <ArrowRight color="#fff" size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Category;
