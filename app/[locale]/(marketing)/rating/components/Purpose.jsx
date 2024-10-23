"use client";

import { useEffect, useRef } from "react";

import { Check } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import Card from "./card";

function Purpose({ purpose, cards }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const textSideRef = useRef(null);
  const imageSideRef = useRef(null);
  const isTextSideOnScreen = useOnScreen(textSideRef);
  const isImageSideOnScreen = useOnScreen(imageSideRef);

  useEffect(() => {
    if (isTextSideOnScreen) {
      textSideRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [isTextSideOnScreen]);

  useEffect(() => {
    if (isImageSideOnScreen) {
      imageSideRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInRight",
      );
    }
  }, [isImageSideOnScreen]);

  return (
    <section className="pb pb-[88px] pt-[120px]">
      <div className="mx-auto flex w-full flex-wrap items-center px-6 xs:max-w-[500px] sm:max-w-[500px] md:max-w-[500px] md:justify-between lg:max-w-[500px] lg:justify-between xl:max-w-[1208px] xl:justify-between 2xl:max-w-[1208px] 2xl:justify-between">
        <div ref={textSideRef} className="w-full max-w-[530px] opacity-0">
          <span className="text-lg font-medium text-customSilver">
            {translations.common?.rating}
          </span>
          <h2 className="font-semibold xs:text-[40px] sm:text-[52px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
            {purpose.title}
          </h2>
          <p className="text-lg text-customSilver">{purpose.description}</p>
          <div className="mt-8 flex flex-col gap-y-3">
            {purpose.list.map(({ item, id }) => (
              <div
                key={id}
                className="flex gap-3 xs:items-start sm:items-center md:items-center lg:items-center xl:items-center 2xl:items-center"
              >
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[1000px] bg-[#9FE870]">
                  <Check size={12} strokeWidth={3} />
                </div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Image
          ref={imageSideRef}
          className="w-full max-w-[500px] opacity-0 xs:mt-8 sm:mt-8 md:mt-8 lg:mt-8 xl:mt-0 2xl:mt-0"
          src={`https://admin.it-ea.uz${purpose.image.data.attributes.url}`}
          width={500}
          height={450}
          alt="Image"
        />
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-[1208px] flex-wrap justify-center gap-8 px-6">
        {cards.map((item) => (
          <Card data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}

export default Purpose;
