"use client";

import React, { useEffect, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useTranslations from "@/hooks/utils/use-translation";
import useWindowSize from "@/hooks/utils/use-window-size";

import { fetchCourseFilters } from "@/services/api/coursera";

import { cn } from "@/lib/utils";

function SubjectsModal() {
  const router = useRouter();
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const size = useWindowSize();
  const [domains, setDomains] = useState({});
  const [activeDomainName, setActiveDomainName] = useState("");

  const isMobile = size.width <= 800;

  const handleDomainMouseEnter = (domain) => {
    if (!isMobile) {
      setActiveDomainName(domain);
    }
  };

  const handleDialogMouseLeave = () => {
    if (!isMobile) {
      setActiveDomainName("");
    }
  };

  const handleDomainClick = (domain) => {
    if (isMobile) {
      router.push(`/${locale}/coursera/courses?page=1&domains=${domain}`);
    }
  };

  useEffect(() => {
    fetchCourseFilters().then(({ domains = {} }) => {
      setDomains(domains);
    });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xl"
          className="mb-[28px] ml-4 bg-[#0056D2] md:ml-0 xl:ml-[-30px]  xl:h-[30px] xl:text-[14px] 2xl:ml-[-120px] 2xl:h-[52px] 2xl:text-base"
        >
          <span className="font-semibold text-white">
            {translations.common?.explore}
          </span>
          <ChevronDown color="#fff" />
        </Button>
      </DialogTrigger>
      <DialogContent
        hideClose
        className={cn(
          "ml-[-180px] w-auto gap-0 !rounded-3xl border-0 transition-colors",
          activeDomainName && "!rounded-e-none",
          isMobile && "ml-0",
        )}
        onMouseLeave={handleDialogMouseLeave}
      >
        <h2 className="mb-6 leading-7 text-customBlack">
          {translations.common?.subjects}
        </h2>
        <ul className={cn("w-[312px]", isMobile && "w-[280px]")}>
          {Object.keys(domains).map((domain, i) => (
            <li
              key={domain + i}
              onClick={() => handleDomainClick(domain)}
              onMouseEnter={() => handleDomainMouseEnter(domain)}
              className="flex cursor-default items-center p-2 text-base text-customSilver transition-colors hover:bg-[#F5F5F5] hover:text-customBlack"
            >
              {domain}
              <ChevronRight className="ml-auto h-4 w-4" />
            </li>
          ))}
        </ul>

        {activeDomainName && (
          <div className="absolute left-full top-0 h-full w-[360px] rounded-e-3xl border-l border-customGreyscale bg-background px-3 py-6">
            <h2 className="mb-6 pl-3 leading-7 text-customBlack">
              {activeDomainName}
            </h2>
            <ul className="w-[312px]">
              {domains[activeDomainName].map((subdomain, i) => (
                <li
                  key={subdomain + i}
                  className="flex cursor-default items-center px-3 py-2 text-base font-medium text-customBlack transition-colors hover:bg-[#F5F5F5]"
                >
                  <Link
                    href={`/${locale}/coursera/courses?page=1&domains=${activeDomainName}&subdomains=${subdomain}`}
                  >
                    {subdomain}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SubjectsModal;
