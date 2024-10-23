"use client";

import React from "react";

import { useParams, useSearchParams } from "next/navigation";

import CourseCard from "@/components/common/course-card";

import useTranslations from "@/hooks/utils/use-translation";

import Pagination from "./pagination";

function CourseList({ courses }) {
  const searchParams = useSearchParams();
  const selectedSubdomains = searchParams.getAll("subdomains");
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <div className="flex-1">
      {courses?.data?.length ? (
        <h2 className="mb-9">
          {translations.coursera_filters?.results_count?.(
            courses?.meta?.pagination?.total,
            selectedSubdomains.length ? selectedSubdomains.join(", ") : "",
          )}
        </h2>
      ) : null}
      <div
        className="grid justify-center gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(276px, max-content)",
        }}
      >
        {courses?.data?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <Pagination
        className="mt-9"
        totalPages={courses?.meta?.pagination?.pageCount}
      />
    </div>
  );
}

export default CourseList;
