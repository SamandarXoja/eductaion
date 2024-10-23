"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Card({ data }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__bounceIn",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <div
      ref={elementRef}
      className="w-full max-w-[365px] border bg-white p-6 opacity-0"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[1000px] bg-[#F0FBFF]">
        <Image
          src={`https://admin.it-ea.uz${data.icon.data.attributes.url}`}
          width={40}
          height={40}
          alt="heart icon"
        />
      </div>
      <h3 className="mb-3  mt-6 text-2xl font-semibold">{data.title}</h3>
      <p className="text-lg text-customSilver">{data.description}</p>
    </div>
  );
}

export default Card;
