"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import useOnScreen from "@/hooks/utils/use-on-screen";

function PartnerCard({ partner, locale }) {
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
    <Link
      ref={elementRef}
      href={partner?.attributes?.url || "/"}
      className="rotate1 min-h-[215px] w-full max-w-[365px] border bg-white  opacity-0 shadow-md"
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

      <div className="title-box h-full w-full p-6">
        <Image
          src={`https://admin.it-ea.uz${partner?.attributes?.icon.data.attributes.url}`}
          height={48}
          width={48}
          alt="Partners icon"
          priority
        />
        <h3 className="mt-6 text-2xl font-semibold">
          {partner?.attributes?.title}
        </h3>
        <p className="mt-3 w-full max-w-[300px] self-stretch text-customSilver">
          {partner?.attributes?.description[`description_${locale}`]}
        </p>
      </div>
    </Link>
  );
}

export default PartnerCard;
