"use client";

import React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { DEFAULT_SHOWN_FILTERS_COUNT } from "./index";

function SubdomainList({ title, subdomains, onFilterChange }) {
  const searchParams = useSearchParams();
  const selectedSubdomains = searchParams.getAll("subdomains");
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const showMoreToggle = useToggle(false);

  return (
    <div className="space-y-2">
      <h3 className="text-lg text-customBlack">{title}</h3>
      <div className="grid gap-y-2">
        {subdomains
          ?.slice(
            0,
            showMoreToggle.isOpen ? undefined : DEFAULT_SHOWN_FILTERS_COUNT,
          )
          ?.map((subdomain) => (
            <div
              key={subdomain + title}
              className="flex items-center space-x-3"
            >
              <Checkbox
                id={subdomain + title}
                className="h-5 w-5"
                checked={selectedSubdomains.includes(subdomain)}
                onCheckedChange={() => onFilterChange("subdomains", subdomain)}
              />
              <label
                htmlFor={subdomain + title}
                className="text-base text-customSilver peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {subdomain}
              </label>
            </div>
          ))}
        {subdomains?.length > DEFAULT_SHOWN_FILTERS_COUNT ? (
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

export default SubdomainList;
