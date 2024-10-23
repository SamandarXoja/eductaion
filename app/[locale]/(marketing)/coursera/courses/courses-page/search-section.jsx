"use client";

import React, { useMemo } from "react";

import { Filter, Search } from "lucide-react";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useTranslations from "@/hooks/utils/use-translation";

import coursera from "@/public/images/coursera-half.png";

function SearchSection({ onFilterClick }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const translations = useTranslations(locale);

  const filtersCount = useMemo(() => {
    const subdomains = searchParams.getAll("subdomains");
    const type = searchParams.getAll("type");
    const difficultyLevel = searchParams.getAll("difficultyLevel");
    const skills = searchParams.getAll("skills");

    return (
      subdomains.length + type.length + difficultyLevel.length + skills.length
    );
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="bg-customGray px-6">
      <div className="relative mx-auto flex w-full max-w-[1160px] justify-center sm:justify-start">
        <div className="z-[1] my-3 flex space-x-3 sm:my-6">
          <Input
            type="search"
            placeholder={translations.common?.search}
            startIcon={<Search />}
            wrapperClassName="inline-flex items-center"
            className="h-11 max-w-[300px]"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get("search")?.toString()}
          />
          <Button
            variant="outline"
            className="relative h-11 text-base lg:hidden"
            onClick={onFilterClick}
          >
            <Filter className="mr-1 h-4 w-4" />
            Filters
            {filtersCount > 0 && (
              <span className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
                {filtersCount}
              </span>
            )}
          </Button>
        </div>
        <Image
          src={coursera}
          alt="Coursera"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
}

export default SearchSection;
