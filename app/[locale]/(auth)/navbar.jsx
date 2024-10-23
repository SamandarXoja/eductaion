"use client";

import { Suspense } from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import LangSwitcher from "@/components/common/lang-switcher";

import useTranslations from "@/hooks/utils/use-translation";

import logoEn from "../../../public/images/LogoENwhite.png";
import profilePic from "../../../public/images/Logowhite.png";

export default function Navbar() {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const pathname = usePathname();

  const showLoginButton = pathname !== "/login" && pathname !== "/signup";

  return (
    <div className="border-b border-white/10 px-4 sm:px-8">
      <nav className="mx-auto flex w-full max-w-[980px] items-center justify-between py-5">
        <Link href={`/${locale}`}>
          {translations.logo?.isLogo == "en" ? (
            <Image src={logoEn} width={110} height={38} alt="Logo" priority />
          ) : translations.logo?.isLogo === "ru" ? (
            <Image
              src={profilePic}
              width={110}
              height={38}
              alt="Logo"
              priority
            />
          ) : (
            <Image
              src="/images/logo-white.svg"
              width={110}
              height={38}
              alt="Logo"
              priority
            />
          )}
        </Link>

        <div className="flex items-center space-x-3">
          <Suspense fallback={`${translations.common?.loading}...`}>
            <LangSwitcher className="text-white" />
          </Suspense>
          {showLoginButton && (
            <Button variant="outline" className="h-10 text-sm" asChild>
              <Link href={`/${locale}/login`}>
                {translations.common?.login}
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
