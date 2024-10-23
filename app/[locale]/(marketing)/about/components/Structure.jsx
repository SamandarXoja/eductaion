"use client";

import React from "react";

import { Award, CircleUser, Smile, Trophy } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

function Structure({ data }) {
  const params = useParams();
  const translations = useTranslations(params.locale);

  return (
    <section className="content bg-customGray pb-[120px] pt-[88px] xs:mt-3 sm:mt-10 md:mt-20 lg:mt-20 xl:mt-20 2xl:mt-20">
      <div className="mx-auto w-full max-w-[1193px] px-4 py-4">
        <span className="text-gray-400 text-lg font-medium">
          {translations.common?.structure}
        </span>
        <h2 className="mb-16 max-w-[938px] font-semibold leading-[120%] text-customBlack xs:text-[40px] sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
          {data?.structure?.title}
        </h2>
        {data.structure?.image?.data?.attributes?.url && (
          <Image
            className="h-[520px] w-full object-cover"
            src={`https://admin.it-ea.uz${data.structure?.image?.data?.attributes?.url}`}
            alt="organization img"
            width={1192}
            height={520}
            priority
          />
        )}

        <div className="flex flex-wrap justify-center gap-8">
          {data.structure.structures.map((item) => {
            return (
              <div
                className="w-full max-w-[564px] border bg-white px-8 py-8"
                key={item.id}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Image
                    src={`https://admin.it-ea.uz${item.icon?.data?.attributes?.url}`}
                    width={28}
                    height={28}
                    alt="structures icon"
                    priority
                  />
                </div>
                <h3 className="mb-3 mt-6 text-2xl font-semibold text-black">
                  {item.title}
                </h3>
                <p className="text-gray-400 self-stretch text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1193px] px-4 py-4 xs:mt-10 sm:mt-52 md:mt-52 lg:mt-52 xl:mt-52 2xl:mt-52">
        <div className="bg"></div>
        <span>{translations.common?.career}</span>
        <h2 className="mb-16 mt-4 w-full max-w-[938px] font-semibold leading-[120%] xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
          {data.career?.title}
        </h2>
        <p className="text-gray-400 self-stretch text-lg leading-[150%]">
          {data.career?.description}
        </p>
      </div>
    </section>
  );
}

export default Structure;
