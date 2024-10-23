"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { Copyright } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

import { fetchContactInfo } from "@/services/api/contact-info";

function Footer() {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const [contactInfo, setContactInfo] = useState(null);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    fetchContactInfo().then(({ data }) => setContactInfo(data?.attributes));
  }, []);

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

  const { linkedIn, twitter, facebook } = useMemo(() => {
    const linkedIn = contactInfo?.socialMedia?.find(
      (item) => item.name === "LinkedIn",
    )?.link;
    const twitter = contactInfo?.socialMedia?.find(
      (item) => item.name === "Twitter",
    )?.link;
    const facebook = contactInfo?.socialMedia?.find(
      (item) => item.name === "Facebook",
    )?.link;

    return { linkedIn, twitter, facebook };
  }, [contactInfo]);

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
    <footer className="border-t py-16">
      <div
        ref={elementRef}
        className="mx-auto w-full max-w-[1194px] px-4 opacity-0 xs:hidden sm:hidden md:block lg:block xl:block 2xl:block"
      >
        <div className="flex flex-wrap justify-between gap-y-8">
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
          <div className="flex max-w-64  gap-2">
            <div>
              <MapPin size={24} color="#737373" />
            </div>
            <Link
              href={contactInfo?.addressUrl || "/"}
              target="_blank"
              className="text-gray-500 text-base"
            >
              {contactInfo?.address}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-y-7">
          <ul className="mt-8 flex flex-wrap gap-8 xs:mb-6 xs:flex-col sm:mb-0 sm:flex-row md:mb-0 md:flex-row lg:mb-0 lg:flex-row xl:mb-0 xl:flex-row 2xl:mb-0 2xl:flex-row">
            {links.map((link) => (
              <li key={link.path}>
                <Link href={`/${locale}${link.path}`} className="font-medium">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex w-[233px] flex-col gap-2">
            {contactInfo?.phoneNumber.map(({ item, id }) => (
              <a
                href={`tel:${item}`}
                key={id}
                className="flex w-full max-w-64 gap-3 text-customSilver"
              >
                <Phone /> {item}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-72 flex flex-wrap items-center justify-between gap-y-8">
          <p className="flex gap-1">
            <Copyright />
            <span>
              {new Date().getFullYear()}
              {translations.common?.footer?.copyright_text}
            </span>
            <Link href={"privacy-policy"} className="ml-4">
              {translations.common?.footer?.terms_of_use}
            </Link>
          </p>
          <ul className="flex flex-wrap gap-4">
            {contactInfo?.socialMedia?.map((item) => (
              <li key={item.id}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`https://admin.it-ea.uz${item?.icon?.data?.attributes?.url}`}
                    width={20}
                    height={20}
                    priority
                    alt={item.name}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[840px] px-4 xs:block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
        <Link href={`/${locale}`}>
          <Image
            className="mb-8 w-32"
            src="/images/logo.svg"
            width={110}
            height={38}
            alt="Logo"
            priority
          />
        </Link>

        <div className="flex">
          <ul className="grid grid-cols-2 gap-x-28">
            {links.map((link) => (
              <li key={link.path} className="mt-3">
                <Link href={`/${locale}${link.path}`} className="font-medium">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex w-full max-w-[242px] gap-3">
          <div>
            <MapPin size={24} color="#737373" />
          </div>
          <Link
            href={contactInfo?.addressUrl || "/"}
            target="_blank"
            className="text-gray-500 text-base"
          >
            {contactInfo?.address}
          </Link>
        </div>
        {contactInfo?.phoneNumber.map(({ item, id }) => (
          <a
            key={id}
            href={`tel:${item}`}
            className="mt-6 flex w-full max-w-64 gap-3 text-customSilver"
          >
            <Phone /> {item}
          </a>
        ))}
        <div className="mx-auto mt-8 w-full max-w-[90%] border"></div>
        <div>
          <p className="mt-8 flex justify-center gap-1">
            <Copyright color="#737373" />{" "}
            <span className="text-customSilver">
              {translations.common?.footer?.copyright_text}
            </span>
          </p>
          <ul className="mt-3 flex justify-center gap-4">
            {linkedIn && (
              <li>
                <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/icons/LinkedIn.svg"
                    width={20}
                    height={20}
                    priority
                    alt="LinkedIn"
                  />
                </a>
              </li>
            )}
            {twitter && (
              <li>
                <a href={twitter} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/icons/Twitter.svg"
                    width={20}
                    height={20}
                    priority
                    alt="Twitter"
                  />
                </a>
              </li>
            )}
            {facebook && (
              <li>
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/icons/facebook.svg"
                    width={20}
                    height={20}
                    priority
                    alt="Facebook"
                  />{" "}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
