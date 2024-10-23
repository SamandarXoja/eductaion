"use client";

import React from "react";

import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import LeadershipItem from "./leadership-item";

function Leadership({ data }) {
  const params = useParams();
  const translations = useTranslations(params.locale);

  return (
    <section className="mt-[120px] xs:mt-[50px] sm:mt-[50px] md:mt-[50px] lg:mt-[60px] xl:mt-[120px] 2xl:mt-[120px]">
      <div className="mx-auto w-full max-w-[1190px] px-4">
        <p className="text-gray-400 mb-8  text-2xl font-semibold xs:mt-2 sm:mt-2 md:mt-12 lg:mt-12 xl:mt-12 2xl:mt-12">
          {translations.common?.leadership}
        </p>

        {data?.leadership?.map((item) => {
          return <LeadershipItem leader={item} key={item.id} />;
        })}
      </div>
    </section>
  );
}

export default Leadership;
