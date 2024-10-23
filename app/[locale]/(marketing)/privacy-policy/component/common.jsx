"use client";

import React from "react";

import { useParams, useSearchParams } from "next/navigation";
import Markdown from "react-markdown";

import useTranslations from "@/hooks/utils/use-translation";

function Common({ data }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const searchParams = useSearchParams();
  const show = searchParams.get("show") ? "payment" : "common";

  return (
    <section className="mx-auto my-[56px] w-full max-w-[1208px] px-6">
      <h1 className="text-center">{translations.common.privacy_policy}</h1>

      <Markdown>{data?.[show]}</Markdown>
    </section>
  );
}

export default Common;
