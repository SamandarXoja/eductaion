"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import Markdown from "react-markdown";

import useOnScreen from "@/hooks/utils/use-on-screen";

function PartnersInfo({ dataPartnersPage }) {
  const { data } = dataPartnersPage;

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
    <section ref={elementRef} className="mt-24 pb-24 opacity-0">
      <Image
        className="mx-auto h-[620px] object-cover"
        priority
        src={`https://admin.it-ea.uz${data?.attributes?.image?.data?.attributes?.url}`}
        width={1160}
        height={520}
        alt="image For Partners"
      />

      <div className="mx-auto mb-12 mt-12 w-full max-w-[1160px] border-t"></div>
      <div className="mx-auto w-full max-w-[950px] px-[15px]">
        <Markdown>{data.attributes.pageInfo}</Markdown>
      </div>
    </section>
  );
}

export default PartnersInfo;
