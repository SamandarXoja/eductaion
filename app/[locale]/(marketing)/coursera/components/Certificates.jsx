"use client";

import React, { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

function Certificates({ data }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const isHeaderOnScreen = useOnScreen(headerRef);
  const isCardsOnScreen = useOnScreen(cardsRef);

  useEffect(() => {
    if (isHeaderOnScreen) {
      headerRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__slideInUp",
      );
    }
  }, [headerRef, isHeaderOnScreen]);

  useEffect(() => {
    if (isCardsOnScreen) {
      cardsRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__slideInUp",
      );
    }
  }, [cardsRef, isCardsOnScreen]);

  return (
    <section className="py-[120px]">
      <div className="mx-auto w-full max-w-[1194px] px-4">
        <div ref={headerRef} className="opacity-0">
          <h2 className="font-semibold text-[#0A0A0A] xs:text-[30px] sm:text-[32px] md:text-[52px] lg:text-[52px]  xl:text-[52px] 2xl:text-[52px]">
            {data?.attributes?.compensableCertificatesInfo?.title}
          </h2>
          <p className="w-full max-w-[745px] text-[#737373]">
            {data?.attributes?.compensableCertificatesInfo?.description}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="mt-[64px] flex flex-wrap justify-center gap-[24px] opacity-0"
        >
          {data?.attributes?.compensableCertificatesList?.map((item) => (
            <div
              key={item.id}
              className="relative flex w-full max-w-[568px] flex-col items-start justify-between rounded-[20px] border bg-white px-6 pb-8 pt-6 shadow-sm"
            >
              <div>
                <div className="bg absolute right-[10px] top-[15px] flex w-full max-w-[98px] rotate-[9deg] justify-center rounded-[1000px] bg-[#40B3E7] py-[7px] text-[12px] font-medium text-[#fff] shadow-sm">
                  🎁 {translations.coursera_home?.bonus_amount("50%")}
                </div>
                <h3 className="text-[24px] font-semibold">{item.title}</h3>
                <p className="mt-1 text-[#737373]">{item.description}</p>
              </div>
              <Link
                href={item.url}
                className={cn(
                  buttonVariants({
                    className: "mt-10 rounded-full",
                  }),
                )}
              >
                <span className="font-semibold text-[#fff]">
                  {translations.common?.learn_more}
                </span>
                <ArrowRight color="#fff" size={20} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
