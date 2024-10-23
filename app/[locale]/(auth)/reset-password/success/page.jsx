"use client";

import React from "react";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import useTranslations from "@/hooks/utils/use-translation";

import Card from "../../components/card";
import Description from "../../components/description";
import Title from "../../components/title";

function Success() {
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary-light">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary">
            <CheckCircle className="h-5 w-5 text-primary-dark" />
          </div>
        </div>
        <Title>{translations.reset_password?.success?.title}</Title>
        <Description>
          {translations.reset_password?.success?.description}
        </Description>
      </div>
      <Button className="w-full" asChild>
        <Link href={`/${locale}/login`}>{translations.common?.continue}</Link>
      </Button>
    </Card>
  );
}

export default Success;
