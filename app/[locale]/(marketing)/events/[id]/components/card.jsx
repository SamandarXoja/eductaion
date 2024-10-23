"use client";

import { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Card({ data, categoryId, formattedDate, locale, translations }) {
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
    <div
      ref={elementRef}
      className="mx-auto w-full max-w-[1160px] border bg-white p-10 opacity-0 shadow-md"
    >
      <span className="font-medium text-customSilver">{formattedDate}</span>
      <h3 className="text-[32px] font-semibold">
        {data.attributes.title[`title_${locale}`]}
      </h3>
      <p className="mt-4 w-full max-w-[1080px] text-customSilver">
        {data.attributes.description[`description_${locale}`]}
      </p>
      <Link
        href={`/${locale}/events/${categoryId}/${data.id}`}
        className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-[14px] pl-[30px] pr-5 sm:w-auto"
      >
        <span className="font-semibold text-white">
          {translations?.learn_more}
        </span>
        <ArrowRight color="#fff" size={20} />
      </Link>
    </div>
  );
}

export default Card;
