import React from "react";

import axios from "axios";
import Image from "next/image";

import useTranslations from "@/hooks/utils/use-translation";

import { PARTNERS_PAGE_SIZE } from "@/constants";

import HeroPartners from "./components/HeroPartners";
import PartnersCarts from "./components/PartnersCarts";
import PartnersInfo from "./components/PartnersInfo";

async function fetchDataPartners(locale) {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/partners-page?populate=deep&locale=${locale}`,
  );

  return res.data;
}

async function fetchNationalPartners() {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/partners?populate=deep&filters[isGlobal][$eq]=false&pagination[page]=1&pagination[pageSize]=${PARTNERS_PAGE_SIZE}&sort[0]=id:asc`,
  );

  return res.data;
}

async function fetchGlobalParterns() {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/partners?populate=deep&filters[isGlobal][$eq]=true&pagination[page]=1&pagination[pageSize]=${PARTNERS_PAGE_SIZE}&sort[0]=id:asc`,
  );

  return res.data;
}

async function Partners({ params: { locale } }) {
  const dataPartnersPage = await fetchDataPartners(locale);
  const globalPartners = await fetchGlobalParterns();
  const nationalPartners = await fetchNationalPartners();

  const translations = useTranslations(locale);

  return (
    <>
      <HeroPartners dataPartnersPage={dataPartnersPage} />
      <PartnersInfo dataPartnersPage={dataPartnersPage} />
      <PartnersCarts
        data={nationalPartners}
        title={translations.common?.national_partners}
      />
      <PartnersCarts
        data={globalPartners}
        title={translations.common?.global_partners}
        isGlobal
      />
    </>
  );
}

export default Partners;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "partners",
  );

  const previousImages = (await parent).openGraph?.images || [];
  if (data)
    return {
      title: data.title,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        url: "https://www.ite-association.uz/",
        images: [
          `https://admin.it-ea.uz${data?.image?.data?.attributes?.url}`,
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: [`https://admin.it-ea.uz${data?.image?.data?.attributes?.url}`], // Must be an absolute URL
      },
      robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: false,
          noimageindex: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
}
