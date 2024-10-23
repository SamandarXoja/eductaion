"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

import base64 from "base-64";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Check } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { fetchProfile } from "@/services/api/profile";

import { cn } from "@/lib/utils";

import PaymentDialog from "./payment-dialog";
import PaymentSuccessDialog from "./payment-success-dialog";
import PlanCard from "./pricing-card";

dayjs.extend(duration);
dayjs.extend(relativeTime);

function Subscription({ data, plans }) {
  const { locale } = useParams();
  const { push } = useRouter();
  const translations = useTranslations(locale);
  const searchParams = useSearchParams();

  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;
  const dialogSuccessToggle = useToggle();
  const dialogToggle = useToggle();

  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);

  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const isHeaderOnScreen = useOnScreen(headerRef);
  const isInfoOnScreen = useOnScreen(infoRef);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      fetchProfile()
        .then((profile) => {
          setProfile(profile);
        })
        .catch((error) => {
          if (error.response.statusText === "Unauthorized") {
            localStorage.clear("");
          }
        });
    }
  }, []);

  const handleButtonClick = (plan) => {
    if (profile) {
      setPlan(plan);
      dialogToggle.open();
    } else {
      push(`/${locale}/login`);
    }
  };

  useEffect(() => {
    if (searchParams.get("show") === "dialog") {
      dialogSuccessToggle.open();
    }
  }, []);

  useEffect(() => {
    if (isHeaderOnScreen) {
      headerRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInLeft",
      );
    }
  }, [headerRef, isHeaderOnScreen]);

  useEffect(() => {
    if (isInfoOnScreen) {
      infoRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInRight",
      );
    }
  }, [infoRef, isInfoOnScreen]);

  return (
    <>
      <Suspense>
        <PaymentSuccessDialog toggle={dialogSuccessToggle} />
        <PaymentDialog profile={profile} plan={plan} toggle={dialogToggle} />
      </Suspense>
      <section className="pb-[120px] pt-[88px]">
        <div
          ref={headerRef}
          className="mx-auto mb-[72px] w-full max-w-[1194px] px-4 opacity-0"
        >
          <Image
            src="/icons/plus.svg"
            alt="earth icon"
            priority
            width={200}
            height={20}
          />
          <h2 className="text-[52px] font-semibold">
            {translations.coursera_home?.pricing?.title}
          </h2>
        </div>
        <div className="mx-auto flex w-full max-w-[1194px] flex-wrap justify-center gap-6  gap-y-[30px] px-4">
          {plans?.map((plan, index) => {
            const isBought = plan.id === profile?.courseraSubscription?.id;
            const duration = dayjs
              .duration(plan.attributes?.duration, "months")
              .locale(dayjsLocale)
              .humanize();

            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                onClick={() => handleButtonClick(plan)}
                duration={duration}
                isBought={isBought}
                boughtText={translations.common?.your_plan}
                price={translations.coursera_home?.pricing?.plan_price(
                  plan.attributes?.amount.toLocaleString().replaceAll(",", " "),
                )}
                index={index}
              />
            );
          })}
        </div>
        <div
          ref={infoRef}
          className="animate__delay-1s mx-auto mt-[72px] w-full max-w-[1194px] px-4 opacity-0"
        >
          <span className="text-lg text-[#737373]">
            {translations.coursera_home?.pricing?.instructions_text}
          </span>

          <ul className="mt-[32px]">
            {data?.attributes?.instructions?.map((instruction, i) => (
              <li key={instruction.id} className="mb-4 flex items-center gap-4">
                <div className="flex h-[20px] w-[20px] flex-none items-center justify-center rounded-[1000px] bg-[#40B3E7] text-sm font-medium text-[#fff]">
                  {i + 1}
                </div>
                <span className="text-[#0A0A0A]">{instruction.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Subscription;
