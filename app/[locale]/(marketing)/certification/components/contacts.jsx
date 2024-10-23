"use client";

import { useEffect, useRef } from "react";

import Markdown from "react-markdown";

import useOnScreen from "@/hooks/utils/use-on-screen";

function Contacts({ pageInfo, contactInfo, translations }) {
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
    <div ref={elementRef} className="opacity-0">
      <section className="mx-auto mt-24 w-full max-w-[950px] px-[15px]">
        <Markdown className="markdown-style">{pageInfo}</Markdown>
      </section>
      <div className="mx-auto mb-24 mt-16 flex w-full max-w-[944px] flex-col gap-1 px-3">
        <b className="text-2xl">{translations?.contact_us}:</b>
        <a
          href={`mailto:${contactInfo?.attributes?.mail}`}
          className="text-lg text-customSilver"
        >
          {translations?.email}: {contactInfo?.attributes?.mail}
        </a>
        <a href="#" className="text-lg text-customSilver">
          {translations?.address}: {contactInfo?.attributes?.address}
        </a>
      </div>
    </div>
  );
}

export default Contacts;
