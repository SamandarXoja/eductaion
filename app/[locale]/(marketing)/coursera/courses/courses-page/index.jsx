"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { fetchCourseFilters, fetchCourses } from "@/services/api/coursera";
import {
  createMultiQueryString,
  removeQueryString,
} from "@/services/query-string";

import { deleteObjProp, removeFalsyValues } from "@/services";

import CourseList from "./course-list";
import DomainList from "./domain-list";
import LevelList from "./level-list";
import SearchSection from "./search-section";
import SkillList from "./skill-list";
import SubdomainList from "./subdomain-list";
import TypeList from "./type-list";

export const DEFAULT_SHOWN_FILTERS_COUNT = 5;

function Courses() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const filtersRef = useRef(null);
  const isFiltersOnScreen = useOnScreen(filtersRef);

  const [filters, setFilters] = useState(null);
  const [courses, setCourses] = useState(null);
  const filtersToggle = useToggle(false);

  const queryParams = useMemo(() => {
    return {
      page: searchParams.get("page"),
      search: searchParams.get("search"),
      type: searchParams.getAll("type"),
      domains: searchParams.getAll("domains"),
      subdomains: searchParams.getAll("subdomains"),
      skills: searchParams.getAll("skills"),
      difficultyLevel: searchParams.getAll("difficultyLevel"),
    };
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    if (queryParams[key].includes(value)) {
      replace(`${pathname}?${removeQueryString(searchParams, key, value)}`);
    } else {
      replace(
        `${pathname}?${createMultiQueryString(searchParams, key, value)}`,
      );
    }

    if (filtersToggle.isOpen) {
      filtersToggle.close();
    }
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchCourseFilters().then((data) => setFilters(data));
  }, []);

  // Set page to 1 if there is no page or filters change
  useEffect(() => {
    if (Number(queryParams.page) !== 1) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`);
    }
  }, [JSON.stringify(deleteObjProp(queryParams, "page"))]);

  useEffect(() => {
    if (queryParams.page) {
      fetchCourses(
        removeFalsyValues({
          pageSize: 12,
          page: queryParams.page,
          search: queryParams.search,
          type: queryParams.type,
          domains: queryParams.domains,
          subdomains: queryParams.subdomains,
          skills: queryParams.skills,
          difficultyLevel: queryParams.difficultyLevel,
        }),
      ).then((data) => setCourses(data));
    }
  }, [JSON.stringify(queryParams)]);

  useEffect(() => {
    if (isFiltersOnScreen) {
      filtersRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInLeft",
      );
    }
  }, [filtersRef, isFiltersOnScreen]);

  return (
    <div className="bg-background">
      <SearchSection onFilterClick={filtersToggle.open} />
      <div className="mx-auto w-full max-w-[1192px] px-4 py-8 md:py-16">
        {filters?.domains ? <DomainList domains={filters?.domains} /> : null}
        <div className="flex lg:space-x-10">
          <div
            ref={filtersRef}
            className="animate__delay-1s hidden w-full max-w-[260px] opacity-0 lg:block"
          >
            <h2 className="mb-[52px] text-2xl text-customBlack">
              {translations.common?.filter_by}
            </h2>
            <div className="grid gap-y-8">
              {queryParams.domains.length ? (
                <SubdomainList
                  title={queryParams.domains[0]}
                  subdomains={filters?.domains?.[queryParams.domains[0]]}
                  onFilterChange={handleFilterChange}
                />
              ) : null}
              <TypeList
                types={filters?.contentTypes}
                onFilterChange={handleFilterChange}
              />
              <LevelList
                levels={filters?.levels}
                onFilterChange={handleFilterChange}
              />
              <SkillList
                skills={filters?.skills}
                onFilterChange={handleFilterChange}
                listClassName="max-h-[500px] overflow-auto"
              />
            </div>
          </div>
          <CourseList courses={courses} />
        </div>
      </div>

      {/* Visible on mobile */}
      <Sheet open={filtersToggle.isOpen} onOpenChange={filtersToggle.set}>
        <SheetContent className="overflow-y-auto">
          <div className="grid gap-y-8">
            {queryParams.domains.length ? (
              <SubdomainList
                title={queryParams.domains[0]}
                subdomains={filters?.domains?.[queryParams.domains[0]]}
                onFilterChange={handleFilterChange}
              />
            ) : null}
            <TypeList
              types={filters?.contentTypes}
              onFilterChange={handleFilterChange}
            />
            <LevelList
              levels={filters?.levels}
              onFilterChange={handleFilterChange}
            />
            <SkillList
              skills={filters?.skills}
              onFilterChange={handleFilterChange}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Courses;
