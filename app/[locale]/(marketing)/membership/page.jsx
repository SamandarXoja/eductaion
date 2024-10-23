import React, { Suspense } from "react";

import axios from "axios";

import useTranslations from "@/hooks/utils/use-translation";

import AccordionMembership from "./components/accordion";
import Cards from "./components/cards";
import Header from "./components/header";

async function fetchMembers(locale) {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/membership-page?populate=deep&locale=${locale}`,
  );

  return res.data.data;
}

const fetchMembir = async () => {
  const res = await axios.get(
    "https://admin.it-ea.uz/api/memberships?populate=deep&sort[0]=id:asc",
  );

  return res.data.data;
};

export default async function Membership({ params: { locale } }) {
  const cards = await fetchMembir();
  const { attributes } = await fetchMembers(locale);
  const translations = useTranslations(locale);

  return (
    <>
      <div className="bg-[#FAFAFA]">
        <section className="pt-20">
          <div className="container">
            <Header
              subtitle={translations.common?.membership}
              title={attributes?.banner?.title}
              description={attributes?.banner?.description}
            />
            <Suspense>
              <Cards data={cards} />
            </Suspense>
          </div>
        </section>
        <section className="pb-[120px]">
          <div className="mt-60">
            <h2 className="mb-4 text-center font-semibold text-customBlack xs:text-3xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl 2xl:text-5xl">
              {attributes?.additionalDataIntro?.title}
            </h2>
            <p className="text-gray-400 m-auto w-full max-w-text text-center text-lg">
              {attributes?.additionalDataIntro?.description}
            </p>
          </div>
          <div className="mt-20">
            <AccordionMembership data={attributes.additionalData} />
          </div>
        </section>
      </div>
    </>
  );
}

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "membership",
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
