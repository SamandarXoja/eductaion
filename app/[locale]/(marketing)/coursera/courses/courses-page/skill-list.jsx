"use client";

import React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

import { DEFAULT_SHOWN_FILTERS_COUNT } from "./";

function SkillList({ skills, onFilterChange, listClassName }) {
  const searchParams = useSearchParams();
  const selectedSkills = searchParams.getAll("skills");
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const showMoreToggle = useToggle(false);

  return (
    <div className="space-y-2 ">
      <h3 className="text-lg text-customBlack">
        {translations.common?.skills}
      </h3>
      <div className={cn("grid gap-y-2", listClassName)}>
        {skills
          ?.slice(
            0,
            showMoreToggle.isOpen ? undefined : DEFAULT_SHOWN_FILTERS_COUNT,
          )
          ?.map((skill, i) => (
            <div key={skill + i} className="flex items-center space-x-3 ">
              <Checkbox
                id={skill + i}
                className="h-5 w-5"
                checked={selectedSkills.includes(skill)}
                onCheckedChange={() => onFilterChange("skills", skill)}
              />
              <label
                htmlFor={skill + i}
                className="text-base text-customSilver peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {skill}
              </label>
            </div>
          ))}
        {skills?.length > DEFAULT_SHOWN_FILTERS_COUNT ? (
          <button
            className="flex items-center text-sm text-customBlue"
            onClick={showMoreToggle.toggle}
          >
            {showMoreToggle.isOpen
              ? translations.common?.show_less
              : translations.common?.show_more}
            {showMoreToggle.isOpen ? (
              <ChevronUp className="ml-2 mt-1 h-5 w-5" />
            ) : (
              <ChevronDown className="ml-2 mt-1 h-5 w-5" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default SkillList;
