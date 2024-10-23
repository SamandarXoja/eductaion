"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Education({ data }) {
  const textSideRef = useRef(null);
  const imageRef = useRef(null);

  const counts = useRef(0);
  const isCounts = useOnScreen(counts);

  const isTextSideOnScreen = useOnScreen(textSideRef);
  const isImageOnScreen = useOnScreen(imageRef);

  const [oneCount, setOneCount] = useState(0);
  const [twoCount, setTwoCount] = useState(0);
  const [threeCount, setThreeCount] = useState(0);

  console.log(twoCount);
  // console.log(oneCount);
  // data.literacyRateValue
  useEffect(() => {
    if (isCounts) {
      let start = 0;
      const interval = setInterval(() => {
        setOneCount(start++);
        if (start > data.institutionsValue) {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isCounts]);

  useEffect(() => {
    if (isCounts) {
      let start = 0;
      const interval = setInterval(() => {
        setTwoCount(start++);
        if (start > data.literacyRateValue) {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isCounts]);



  useEffect(() => {
    if (isCounts) {
      let start = 0;
      const interval = setInterval(() => {
        setThreeCount(start++);
        if (start > data.annualSpecialistsValue) {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isCounts]);






  useEffect(() => {
    if (isTextSideOnScreen) {
      textSideRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [textSideRef, isTextSideOnScreen]);

  useEffect(() => {
    if (isImageOnScreen) {
      imageRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInRight",
      );
    }
  }, [imageRef, isImageOnScreen]);

  return (
    <section className="wrap flex min-h-5">
      <div className="flex min-h-[662px] w-full grow flex-wrap items-center justify-between xs:w-full sm:w-full md:w-full lg:m-0 lg:w-full lg:flex-col xl:mx-auto xl:max-w-[1250px]  xl:flex-row  2xl:mx-auto 2xl:max-w-[1250px] 2xl:flex-row">
        <div className="grow xs:w-full xs:bg-[#1A3560] xs:px-[15px] sm:w-full sm:bg-[#1A3560] sm:px-[15px] md:w-full md:bg-[#1A3560] md:px-[15px] lg:w-full lg:bg-[#1A3560] lg:px-[15px] xl:max-w-[560px] xl:bg-transparent xl:px-[0px] 2xl:max-w-[560px] 2xl:bg-transparent 2xl:px-[0px]">
          <div
            ref={textSideRef}
            className="max-w-[560px] opacity-0 xs:py-8 xs:md:mx-auto sm:mx-auto sm:py-8 md:mx-auto md:py-8 lg:mx-auto lg:py-8 xl:m-0 xl:bg-none  xl:py-0 2xl:m-0 2xl:bg-none 2xl:py-0 "
          >
            <span className="text-lg font-medium text-[#40B3E7]">
              Education 1
            </span>
            <h2 className="font-semibold leading-[120%] text-white xs:text-[40px] sm:text-[52px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
              {data?.title}
            </h2>
            <p className="mt-4 text-lg text-customGrays">{data.description}</p>
            <div
              ref={counts}
              className="mt-[72px] flex justify-between xs:flex-col xs:gap-6 sm:flex-row sm:gap-0 md:flex-row md:gap-0 lg:flex-row lg:gap-0 xl:flex-row xl:gap-0 2xl:flex-row 2xl:gap-0"
            >
              <div className="line">
                <b className="text-[32px] font-semibold text-[#40B3E7]">
                  {oneCount}
                </b>
                <p className="text-customGrays">{data.institutions}</p>
              </div>
              <div className="line">
                <b className="text-[32px] font-semibold text-[#40B3E7]">
                  {twoCount}
                </b>
                <p className="text-customGrays">{data.literacyRate}</p>
              </div>
              <div>
                <b className="text-[32px] font-semibold text-[#40B3E7]">
                  {threeCount}
                </b>
                <p className="text-customGrays">{data.annualSpecialists}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="w-full bg-[#40B3E7] text-center opacity-0 xs:w-full xs:py-12 sm:w-full sm:py-12 md:w-full md:py-12 lg:w-full lg:py-12 xl:max-w-[486px] xl:py-0 2xl:max-w-[486px] 2xl:py-0"
        >
          <Image
            className="mx-auto w-full object-contain xs:max-w-[286px] sm:max-w-[486px] md:max-w-[486px] lg:max-w-[486px] xl:max-w-[486px]  2xl:max-w-[486px]"
            src={`https://admin.it-ea.uz${data?.image?.data?.attributes?.formats?.small?.url}`}
            alt="box"
            priority
            width={486}
            height={509}
          />
        </div>
      </div>
    </section>
  );
}

export default Education;
