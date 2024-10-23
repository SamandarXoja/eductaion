"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";

import { ChevronDown, LogOut, User } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

import Menu from "./Menu";
import MenuItem from "./Menu/MenuItem";
import LangSwitcher from "./lang-switcher";

function Navbar() {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const pathname = usePathname();
  const router = useRouter();
  const navbar = useToggle();
  const [user, setUser] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const bgClass = useMemo(() => {
    if (pathname === "/about") {
      return "bg-[#FAFAFA]";
    } else if (pathname === "/events/category") {
      return "bg-[#FAFAFA]";
    } else if (pathname === "/membership") {
      return "bg-[#FAFAFA]";
    } else if (pathname === "/partners") {
      return "bg-[#FAFAFA]";
    }
    return "bg-white";
  }, [pathname]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const border = pathname === "/" ? "borderw" : "borderb";

  const links = useMemo(() => {
    return [
      { path: "/about", title: translations.common?.about_us },
      { path: "/events", title: translations.common?.events },
      { path: "/membership", title: translations.common?.membership },
      { path: "/partners", title: translations.common?.for_partners },
      { path: "/certification", title: translations.common?.certification },
      { path: "/rating", title: translations.common?.rating },
    ];
  }, [translations]);

  function logout() {
    localStorage.clear();
    location.href = "/";
  }

  return (
    <nav
      className={` ${bgClass} z-10 h-[80px]  px-6 ${border} mx-auto max-w-[1440px]`}
    >
      <NextTopLoader
        color="#40B3E7"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <div className="relative flex h-full w-full items-center justify-between px-2">
        <div className="flex items-center">
          <Link href={`/${locale}`}>
            {translations.logo?.isLogo == "en" ? (
              <Image
                src="/images/Logoen.svg"
                width={110}
                height={38}
                alt="Logo"
                priority
              />
            ) : translations.logo?.isLogo === "ru" ? (
              <Image
                src="/images/Logo1RU.svg"
                width={110}
                height={38}
                alt="Logo"
                priority
              />
            ) : (
              <Image
                src="/images/logo.svg"
                width={110}
                height={38}
                alt="Logo"
                priority
              />
            )}
          </Link>
          <ul className="ml-20 hidden gap-9 xl:flex">
            {links.map((link) => {
              const isActive = pathname.startsWith(`/${locale}${link.path}`);

              return (
                <li key={link.path}>
                  <Link
                    href={`/${locale}${link.path}`}
                    className={cn(
                      "relative text-[14px] font-medium text-customBlack",
                      isActive &&
                        "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']",
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={`/${locale}/coursera`} className="ml-[35px] mt-[4px]">
            <Image
              src="/images/coursera.svg"
              width={78}
              height={78}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="hidden items-center pr-4 xl:flex">
          <Suspense fallback={`${translations.common?.loading}...`}>
            <LangSwitcher className={user && "mr-[40px]"} />
          </Suspense>

          {user?.email ? (
            <Menu
              button={
                <button onClick={() => setMenuOpen(!isMenuOpen)}>
                  <span
                    href={"/profile"}
                    className="flex h-[40px] w-[40px] items-center justify-center rounded-[20px] bg-[#F0FBFF] text-[16px] font-semibold text-[#40B3E7]"
                    style={{ border: "1px solid #D1F0FA" }}
                  >
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </span>
                </button>
              }
              isOpen={isMenuOpen}
              onClickOutside={() => setMenuOpen(false)}
            >
              <MenuItem
                text={translations.common.profile}
                icon={<User size={16} />}
                onClick={() => router.push("profile")}
              />
              <hr />
              <MenuItem
                text={translations.common.logout}
                onClick={logout}
                icon={<LogOut size={16} />}
              />
            </Menu>
          ) : (
            <Link
              href={`/${locale}/signup`}
              className="rounded-full border border-[#D4D4D4] px-[14px] py-[9.4px] text-sm"
            >
              {translations.common?.signup}
            </Link>
          )}
        </div>
        <div className="flex items-center xl:hidden">
          <Suspense fallback={`${translations.common?.loading}...`}>
            <LangSwitcher />
          </Suspense>
          <button onClick={navbar.toggle}>
            {!navbar.isOpen ? <AlignJustify /> : <X />}
          </button>
        </div>
      </div>

      <ul
        className={
          !navbar.isOpen
            ? "hidden"
            : `absolute left-0 w-full border-b px-10 ${bgClass} z-50`
        }
      >
        {links.map((link) => {
          const isActive = pathname.startsWith(`/${locale}${link.path}`);

          return (
            <li key={link.path} className="py-3">
              <Link
                href={`/${locale}${link.path}`}
                onClick={navbar.close}
                className={cn(
                  "relative text-[14px] font-medium text-customBlack",
                  isActive &&
                    "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']",
                )}
              >
                {link.title}
              </Link>
            </li>
          );
        })}

        <li>
          {user?.email ? (
            <>
              <MenuItem
                style={{ paddingRight: 0, paddingLeft: 0 }}
                text={translations.common.profile}
                onClick={() => router.push("profile")}
              />
              <MenuItem
                style={{ paddingRight: 0, paddingLeft: 0 }}
                text={translations.common.logout}
                onClick={logout}
              />
            </>
          ) : (
            <Link
              href={`/${locale}/signup`}
              className="py-3 text-[14px] font-medium text-customBlack"
            >
              {translations?.common?.signup}
            </Link>
          )}
        </li>
        <div className="my-4 flex flex-col items-start"></div>
      </ul>
    </nav>
  );
}

export default Navbar;
