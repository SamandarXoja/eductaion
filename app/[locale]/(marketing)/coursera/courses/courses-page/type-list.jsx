"use client";

import React from "react";

import { useParams, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

import useTranslations from "@/hooks/utils/use-translation";

function TypeList({ types, onFilterChange }) {
  const searchParams = useSearchParams();
  const selectedTypes = searchParams.getAll("type");
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <div className="space-y-2">
      <h3 className="text-lg text-customBlack">
        {translations.common?.content_type}
      </h3>
      <div className="grid gap-y-2">
        {types?.map((contentType, i) => (
          <div key={contentType + i} className="flex items-center space-x-3">
            <Checkbox
              id={contentType + i}
              className="h-5 w-5"
              checked={selectedTypes.includes(contentType)}
              onCheckedChange={() => onFilterChange("type", contentType)}
            />
            <label
              htmlFor={contentType + i}
              className="text-base text-customSilver peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {contentType}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TypeList;
