"use client";

import { useEffect, useRef } from "react";

import { DataTableDemo } from "@/components/common/ratingtable";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Rating({ rating, data }) {
  const headingRef = useRef(null);
  const tableRef = useRef(null);
  const isHeadingOnScreen = useOnScreen(headingRef);
  const isTableOnScreen = useOnScreen(tableRef);

  useEffect(() => {
    if (isHeadingOnScreen) {
      headingRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInLeft",
      );
    }
  }, [headingRef, isHeadingOnScreen]);

  useEffect(() => {
    if (isTableOnScreen) {
      tableRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [tableRef, isTableOnScreen]);

  return (
    <section id="nextSection">
      <div
        ref={headingRef}
        className="mx-auto w-full max-w-[1208px] px-6 opacity-0"
      >
        <h2 className="font-semibold xs:mt-[48px] xs:text-[40px] sm:mt-[100px] sm:text-[52px] md:mt-[240px] md:text-[52px] lg:mt-[120px] lg:text-[52px] xl:mt-[120px] xl:text-[52px] 2xl:mt-[120px] 2xl:text-[52px]">
          {data.title}
        </h2>
        <p className="mt-4 w-full max-w-[767px] text-left text-customSilver">
          {data.description}
        </p>
      </div>
      <div
        ref={tableRef}
        className="mx-auto w-full max-w-[1208px] px-6 opacity-0"
      >
        <DataTableDemo rating={rating} />
      </div>
    </section>
  );
}

export default Rating;
