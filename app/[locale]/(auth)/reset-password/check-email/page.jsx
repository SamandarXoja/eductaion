"use client";

import React from "react";
import { Suspense } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import Card from "../../components/card";
import Header from "./header";

function CheckEmail() {
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <Card>
      <Suspense fallback={`${translations.common?.loading}...`}>
        <Header />
      </Suspense>
      <div className="text-center text-base text-customSilver">
        {translations.reset_password?.check_email?.try_text}{" "}
        <Link
          href={`/${locale}/reset-password/enter-email`}
          className="font-semibold text-customBlack hover:underline"
        >
          {translations.common?.try_again}
        </Link>
      </div>
    </Card>
  );
}

export default CheckEmail;
