"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function PersonCard({ team }) {
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
  }, [elementRef, isOnScreen]);

  return (
    <div
      ref={elementRef}
      className="mx-auto w-[266px] bg-customGray  px-6 py-6 opacity-0"
    >
      <Image
        className="h-[206px] w-[218px] object-cover"
        src={`https://admin.it-ea.uz${team.image?.data?.attributes?.url}`}
        width={218}
        height={206}
        alt="team-img"
        priority
      />
      <b className="mt-6 block text-3xl font-semibold">{team.name}</b>
      <p className="text-gray-400 mt-[6px] text-lg">{team.job_title}</p>
    </div>
  );
}

export default PersonCard;
