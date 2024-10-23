"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Button } from "@/components/ui/button";

import PaginationComponent from "@/components/common/pagination";

import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

function Pagination({ totalPages, className = "" }) {
  const pathname = usePathname();
  const { locale } = useParams();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const translations = useTranslations(locale);

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    totalPages > 1 && (
      <div
        className={cn(
          "flex cursor-pointer justify-between space-x-2",
          className,
        )}
      >
        <Button
          variant="outline"
          className="tab-b cur h-9 space-x-0 px-4 sm:space-x-2"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <div>
            <ArrowLeft size={20} color="#737373" />
          </div>
          <span className="ml-2 text-sm font-semibold text-customSilver xs:hidden sm:block md:block lg:block xl:block 2xl:block">
            {translations.common?.previous}
          </span>
        </Button>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Button
          variant="outline"
          className="tab-b cur h-9 space-x-0 px-4 sm:space-x-2"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span className="mr-2 text-sm font-semibold text-customSilver xs:hidden sm:block md:block lg:block xl:block 2xl:block">
            {translations.common?.next}
          </span>
          <div>
            <ArrowRight color="#737373" size={20} />
          </div>
        </Button>
      </div>
    )
  );
}

export default Pagination;
