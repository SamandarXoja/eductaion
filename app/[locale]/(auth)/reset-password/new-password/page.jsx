"use client";

import React from "react";
import { Suspense } from "react";

import { KeyRound } from "lucide-react";
import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import Card from "../../components/card";
import Description from "../../components/description";
import Title from "../../components/title";
import NewPasswordForm from "./form";

function NewPassword() {
  const params = useParams();
  const translations = useTranslations(params.locale);

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary-light">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary">
            <KeyRound className="h-5 w-5 text-primary-dark" />
          </div>
        </div>
        <Title>{translations.reset_password?.new_password?.title}</Title>
        <Description>
          {translations.reset_password?.new_password?.description}
        </Description>
      </div>
      <Suspense fallback={`${translations.common?.loading}...`}>
        <NewPasswordForm />
      </Suspense>
    </Card>
  );
}

export default NewPassword;
