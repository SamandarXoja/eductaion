"use client";

import { useEffect, useRef } from "react";

import useOnScreen from "@/hooks/utils/use-on-screen";

import Project from "./project";

function Projects({ data, title }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [isOnScreen]);

  return (
    <section>
      <div
        ref={elementRef}
        className="mx-auto w-full px-6 opacity-0 xs:mb-[48px] xs:mt-[96px] xs:max-w-[523px] sm:mb-[120px] sm:mt-[160px] sm:max-w-[1208px] md:mb-[120px] md:mt-[180px] md:max-w-[1208px] lg:mb-[120px] lg:mt-[240px] lg:max-w-[1208px] xl:mb-[120px] xl:mt-[240px] xl:max-w-[1208px] 2xl:mb-[120px] 2xl:mt-[240px] 2xl:max-w-[1208px]"
      >
        <span className="text-lg font-medium text-customSilver">
          Our projects
        </span>
        <h2 className="font-semibold xs:text-[40px] sm:text-[40px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px] ">
          {title}
        </h2>
      </div>
      {data.map((item, i) => (
        <Project key={item.id} project={item} index={i} />
      ))}
    </section>
  );
}

export default Projects;
