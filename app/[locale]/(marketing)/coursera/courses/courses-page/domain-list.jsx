"use client";

import React, { useEffect, useRef } from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

function DomainList({ domains }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedDomains = searchParams.getAll("domains");
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  const handleDomainClick = (domain) => {
    if (selectedDomains.includes(domain)) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("domains");
      params.delete("subdomains");

      replace(`${pathname}?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("subdomains");
      params.set("domains", domain);

      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <div
      ref={elementRef}
      className="mb-6 flex flex-col items-start space-y-2 opacity-0 md:mb-11 md:flex-row md:space-x-3"
    >
      <span className="mt-1 text-sm font-medium text-customBlue md:mt-1.5 md:text-base">
        {translations.common?.subjects}:
      </span>
      <div className="flex flex-wrap">
        {Object.keys(domains).map((domain, i) => {
          const isActive = selectedDomains.includes(domain);

          return (
            <Button
              key={domain + i}
              variant={isActive ? "default" : "outline"}
              className={cn(
                "mb-1 mr-1 h-8 rounded-lg px-2 py-1 text-sm md:mb-3 md:mr-3 md:h-10 md:px-3 md:py-1.5 md:text-base",
                isActive
                  ? "bg-[#0056D2] text-white"
                  : " border-[#D4D4D4]  text-customSilver",
              )}
              onClick={() => handleDomainClick(domain)}
            >
              {domain}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default DomainList;
