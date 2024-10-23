"use client";

import React, { useEffect, useState } from "react";
import { Suspense } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import Card from "../components/card";
import Description from "../components/description";
import Title from "../components/title";
import LoginForm from "./form";

function Login() {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      setUser(localStorage.getItem("user"));
    }
  }, []);

  return (
    <Card>
      {!user && (
        <div className="text-center">
          <Title>{translations.common?.login}</Title>
          <Description>{translations.login?.description}</Description>
        </div>
      )}
      <Suspense fallback={`${translations.common?.loading}...`}>
        <LoginForm />
      </Suspense>
      {!user && (
        <div className="text-center text-base text-customSilver">
          {translations.login?.signup_text}{" "}
          <Link
            href={`/${locale}/signup`}
            className="font-semibold text-customBlack hover:underline"
          >
            {translations.common?.signup}
          </Link>
        </div>
      )}
    </Card>
  );
}

export default Login;
