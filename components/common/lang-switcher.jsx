import React from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { i18n } from "@/i18n-config";
import { cn } from "@/lib/utils";

const translations = {
  en: "En",
  ru: "Ру",
  uz: "O'z",
};

function LangSwitcher({ className = "" }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");

    segments[1] = locale;

    const withSearchParams = segments.join("/") + `?${searchParams.toString()}`;

    return withSearchParams;
  };

  const handleLocaleChange = (locale) => {
    const path = redirectedPathName(locale);

    router.push(path);
  };

  return (
    <Select
      value={params.locale}
      onValueChange={handleLocaleChange}
      className="flex justify-center bg-none outline-none"
    >
      <SelectTrigger
        className={cn(
          "flex w-[75px] justify-center space-x-2 border-0 font-semibold capitalize outline-none [&_svg]:opacity-100",
          className,
        )}
      >
        <SelectValue translate="yes" />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((locale) => {
          return (
            <SelectItem key={locale} value={locale} className="capitalize">
              {translations[locale]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default LangSwitcher;
