"use client";

import React, { useEffect, useRef } from "react";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

function Card({ data }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__jackInTheBox",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <section className="bg-[#F5F7F8]  pb-[120px] pt-[88px]">
      <div
        ref={elementRef}
        className="mx-auto flex w-full max-w-[1194px] flex-wrap justify-center gap-[30px] px-4"
      >
        {data?.attributes?.externalInfo?.map((info) => (
          <div
            key={info.id}
            className="flex w-full max-w-[564px] flex-col items-start rounded-[20px] border border-[#E5E5E5] bg-[#fff] p-8 shadow-sm"
          >
            <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[1000px] bg-[#40B3E7]">
              <Image
                className="mx-auto"
                src={`https://admin.it-ea.uz${info.icon?.data?.attributes?.url}`}
                alt={info.title}
                priority
                width={28}
                height={28}
              />
            </div>
            <h3 className="mb-3 mt-6 text-[24px] text-[#0A0A0A]">
              {info.title}
            </h3>
            <p className="mb-[24px] text-lg leading-[150%] text-[#737373]">
              {info.description}
            </p>
            <Link
              href={info.url}
              className={cn(
                buttonVariants({
                  size: "xl",
                  className: "mt-auto",
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
    </section>
  );
}

export default Card;
