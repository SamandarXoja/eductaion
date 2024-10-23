"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Project({ project, index }) {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const isImageOnScreen = useOnScreen(imageRef);
  const isTextOnScreen = useOnScreen(textRef);

  useEffect(() => {
    if (isImageOnScreen) {
      imageRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [isImageOnScreen]);

  useEffect(() => {
    if (isTextOnScreen) {
      textRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        index % 2 === 0 ? "animate__fadeInRight" : "animate__fadeInLeft",
      );
    }
  }, [index, isTextOnScreen]);

  return (
    <div className="products mx-auto flex w-full max-w-[1208px] flex-wrap-reverse items-center px-6 xs:mb-[48px] xs:justify-center sm:mb-[120px] sm:justify-center md:mb-[120px] md:justify-center  lg:mb-[120px] lg:justify-center   xl:mb-[120px]  xl:justify-between  2xl:mb-[120px]  2xl:justify-between">
      <div
        ref={imageRef}
        className="rotate1 w-full max-w-[500px] border border-[#E5E5E5] p-4 opacity-0 xs:mt-[38px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0"
      >
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>
        <span className="t_over"></span>

        <div className="title-box">
          <Image
            className="object-contain"
            src={`https://admin.it-ea.uz${project?.image?.data?.attributes?.url}`}
            width={468}
            height={418}
            alt="home cart"
          />
        </div>
      </div>

      <div
        ref={textRef}
        className="w-full max-w-[493px] opacity-0 xs:mt-12 sm:mt-9 md:mt-9 lg:mt-0 xl:mt-0 2xl:mt-0"
      >
        <h3 className="text-[52px] font-semibold leading-[120%] xs:text-[40px] sm:text-[40px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
          {project.title}
        </h3>
        <p className="mt-4 text-lg text-customSilver">{project.description}</p>
      </div>
    </div>
  );
}

export default Project;
