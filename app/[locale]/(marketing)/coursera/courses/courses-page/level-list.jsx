"use client";

import React from "react";

import { useParams, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

import useTranslations from "@/hooks/utils/use-translation";

function LevelList({ levels, onFilterChange }) {
  const searchParams = useSearchParams();
  const selectedLevels = searchParams.getAll("difficultyLevel");
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <div className="space-y-2">
      <h3 className="text-lg text-customBlack">
        {translations.common?.levels}
      </h3>
      <div className="grid gap-y-2">
        {levels?.map((level, i) => (
          <div key={level + i} className="flex items-center space-x-3">
            <Checkbox
              id={level + i}
              className="h-5 w-5"
              checked={selectedLevels.includes(level)}
              onCheckedChange={() => onFilterChange("difficultyLevel", level)}
            />
            <label
              htmlFor={level + i}
              className="text-base capitalize text-customSilver peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {level.toLowerCase()}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LevelList;
