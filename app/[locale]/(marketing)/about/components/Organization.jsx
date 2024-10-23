"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import Markdown from "react-markdown";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Organization({ data }) {
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
    <section>
      <div className="markdown-style mx-auto w-full  max-w-[1208px] px-6 py-4">
        <div ref={elementRef} className="opacity-0">
          <h2 className="text-[52px] font-semibold">
            {data.orgHistoryTitle?.title}
          </h2>
          <p className="max-w-[767px] text-lg">
            {data.orgHistoryTitle?.description}
          </p>
          {data.orgHistoryTitle?.image?.data?.attributes?.url && (
            <Image
              className="h-[520px] w-full object-cover"
              src={`https://admin.it-ea.uz${data.orgHistoryTitle?.image?.data?.attributes?.url}`}
              alt="organization img"
              width={1192}
              height={520}
              priority
            />
          )}
        </div>
        <div className="h-[0.5px] max-w-[1208px] border-b border-[#D4D4D4]  px-6"></div>
        <div className="mx-auto w-full max-w-[968px] px-6">
          <Markdown>{data.orgHistory}</Markdown>
        </div>
      </div>
    </section>
  );
}

export default Organization;
