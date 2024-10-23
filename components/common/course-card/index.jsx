"use client";

import React, { useEffect, useRef } from "react";

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import "./index.css";

dayjs.extend(duration);
dayjs.extend(relativeTime);

function CourseCard({ course }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;

  const durationInMinutes = course.estimatedLearningTime || 0;
  const durationInWeeks = Math.floor(durationInMinutes / (7 * 24 * 60));
  const durationInDays = Math.floor(durationInMinutes / (24 * 60));
  const durationInHours = Math.floor(durationInMinutes / 60);

  const duration = durationInWeeks
    ? dayjs.duration(durationInWeeks, "weeks").locale(dayjsLocale).humanize()
    : durationInDays
      ? dayjs.duration(durationInDays, "days").locale(dayjsLocale).humanize()
      : dayjs.duration(durationInHours, "hours").locale(dayjsLocale).humanize();

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
      href={course.contentUrl || "google.com"}
      target="_blank"
      className="card flex flex-col rounded-[20px] bg-[#FAFAFA] p-4 opacity-0" // mb-4: karta orasida 4 piksellik bo'shlik qoldiradi
      style={{ width: 276 }}
    >
      <Image
        src={course.promoPhoto}
        width={244}
        height={160}
        className="h-[160px] overflow-hidden rounded-[8px] object-cover"
        alt={course.name}
        unoptimized
      />

      <div className="flex items-center gap-2 pt-4">
        <div className="h-6">
          <Image
            src={course.partnerLogoUrl || course.promoPhoto}
            width={24}
            height={24}
            className="h-full w-full object-cover"
            alt={course.name}
            unoptimized
          />
        </div>
        <h5 className="text-xs font-medium">{course.partnerName}</h5>
      </div>
      <h3 className="py-4 text-base font-semibold">{course.name}</h3>
      {course.skills && (
        <p className="pb-4 text-xs text-[#737373]">
          <span className="font-medium text-[#0A0A0A]">
            {translations.common?.skills}:{" "}
          </span>
          {course.skills}
        </p>
      )}
      <div className="mt-auto flex text-ellipsis text-xs">
        {course.difficultyLevel && (
          <p className="text-xs capitalize">
            {course.difficultyLevel.toLowerCase()}
          </p>
        )}
        <span className="w-3 text-center">•</span>
        <p className="text-xs capitalize">{course.type}</p>
        <span className="w-3 text-center">•</span>
        <p className="text-xs">{duration}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
