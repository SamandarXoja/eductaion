"use client";

import React from "react";

import { MoveDown } from "lucide-react";

function HeroBanner({ data }) {
  return (
    <section className="plusSec h-[100vh] bg-white">
      <div className="header px-5">
        <h1
          className="animate__animated animate__fadeInUp animate__delay-1s mx-auto w-full max-w-[620px] text-center font-semibold leading-[120%] xs:text-[48px] sm:text-[68px] md:text-[68px] lg:text-[68px] xl:text-[68px] 2xl:text-[68px]"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        <p className="animate__animated animate__fadeInUp animate__delay-1s mt-10 w-full max-w-[576px] text-center text-lg text-customSilver">
          {data?.description}
        </p>
      </div>
      <div className="pulse">
        <span style={{ animationDelay: "0s" }}></span>
        <span style={{ animationDelay: "3s" }}></span>
        <span style={{ animationDelay: "6s" }}></span>
        <span style={{ animationDelay: "9s" }}></span>
        <a
          href="#nextSection"
          role="button"
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          <MoveDown strokeWidth={1} color="#D4D4D4" />
        </a>
      </div>
    </section>
  );
}

export default HeroBanner;
