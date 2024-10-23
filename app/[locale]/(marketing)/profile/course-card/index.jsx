"use client";

import React from "react";

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import "./index.css";

dayjs.extend(duration);
dayjs.extend(relativeTime);

function CourseCard({ course }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const dayjsLocale = locale === "uz" ? "uz-latn" : locale;

  const durationInMinutes = course.approxTotalCourseHrs * 60 || 0;
  const durationInWeeks = Math.floor(durationInMinutes / (7 * 24 * 60));
  const durationInDays = Math.floor(durationInMinutes / (24 * 60));
  const durationInHours = Math.floor(durationInMinutes / 60);

  const duration = durationInWeeks
    ? dayjs.duration(durationInWeeks, "weeks").locale(dayjsLocale).humanize()
    : durationInDays
      ? dayjs.duration(durationInDays, "days").locale(dayjsLocale).humanize()
      : dayjs.duration(durationInHours, "hours").locale(dayjsLocale).humanize();

  return (
    <div
      className="card flex flex-col rounded-[20px] bg-[#FAFAFA] p-4"
      style={{ width: 290 }}
    >
      <h5 className="text-xs font-medium">{course.partnerNames?.join(", ")}</h5>
      <h3 className="py-4 text-base font-semibold">{course.contentName}</h3>
      <div className="mt-auto flex text-ellipsis text-xs">
        <p className="text-xs capitalize">{course.contentType}</p>
        <span className="w-3 text-center">•</span>
        <p className="text-xs">{duration}</p>
      </div>
    </div>
  );
}

export default CourseCard;
