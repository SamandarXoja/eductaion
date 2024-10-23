"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import BenefitItem from "./benefit-item";
import SubjectsModal from "./subjects-modal";

function Herobanner({ data }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const headerRef = useRef(null);
  const infoRef = useRef(null);
  const isHeaderOnScreen = useOnScreen(headerRef);
  const isInfoOnScreen = useOnScreen(infoRef);

  useEffect(() => {
    if (isHeaderOnScreen) {
      headerRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [headerRef, isHeaderOnScreen]);

  useEffect(() => {
    if (isInfoOnScreen) {
      infoRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [infoRef, isInfoOnScreen]);

  return (
    <section className="bgss relative z-10 pb-[120px]">
      <div className="absolute left-0 right-0 -z-10  mx-auto w-full max-w-[1250px] text-center">
        <Image
          src="/images/bg.svg"
          alt="bg"
          priority
          width={1000}
          height={1100}
        />
      </div>
      <div>
        <div
          ref={headerRef}
          className="mx-auto w-full max-w-[1194px] pt-10 opacity-0"
        >
          <SubjectsModal />
          <h1
            className="subtitles text text-center font-semibold leading-[120%] xs:p-3  xs:text-[33px]
            sm:p-3 sm:text-[40px] md:p-2 md:text-[48px] lg:p-0 xl:p-0 2xl:p-0 2xl:text-[48px]"
          >
            {data?.attributes?.banner?.title}
          </h1>
          <p className="mx-auto mt-[30px] w-full max-w-[690px] text-center xs:p-3 sm:p-3  md:p-2 lg:p-0 xl:p-0 xl:text-[14px] 2xl:p-0 2xl:text-lg">
            {data?.attributes?.banner?.description}
          </p>
        </div>
        <div className="xs: mx-auto flex w-full  max-w-[1194px] flex-wrap gap-y-[30px] px-4 xs:mt-[40px] xs:justify-center sm:mt-[40px] sm:justify-center  md:mt-[40px] md:justify-between lg:mt-[40px] lg:justify-between xl:mt-[30px] xl:justify-between 2xl:mt-[50px]  2xl:justify-between">
          {data?.attributes?.benefits?.map((benefit) => (
            <BenefitItem benefit={benefit} key={benefit.id} />
          ))}
        </div>
        <div className="flex flex-col justify-center gap-4 xs:mt-[10px] sm:mt-[10px] sm:flex-row md:mt-[10px] lg:mt-[10px] xl:mt-[10px] 2xl:mt-[30px]">
          {!user?.email && (
            <Button className=" 2xl:h-[56px]  2xl:text-base" size="xl" asChild>
              <Link href={`/${locale}/signup`}>
                {translations.common.signup}
              </Link>
            </Button>
          )}

          <Button
            className=" 2xl:h-[56px]  2xl:text-base"
            size="xl"
            asChild
            variant={user?.email ? "" : "outline"}
          >
            <Link href={`/${locale}/coursera/courses`}>
              {translations.common?.view_course}
            </Link>
          </Button>
        </div>
        <div
          ref={infoRef}
          className="mx-auto mt-[40px] flex w-full max-w-[1194px] flex-col justify-center px-4 opacity-0"
        >
          <p className="mx-auto w-full max-w-[690px] text-center text-[15px]">
            {data?.attributes?.additionalInfo}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Herobanner;
