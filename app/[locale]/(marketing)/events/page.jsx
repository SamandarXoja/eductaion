import React from "react";

import axios from "axios";
import dayjs from "dayjs";

import useTranslations from "@/hooks/utils/use-translation";

import Category from "./components/Category";
import Dates from "./components/Dates";
import HeroEvents from "./components/HeroEvents";

// /api/events?filters[date][$gte]=2024-02-01&filters[date][$lt]=2024-03-01

const fetchCategories = async () => {
  const res = await axios.get(
    "https://admin.it-ea.uz/api/event-categories?populate=deep,4",
  );

  return res.data;
};

const fetchEventData = async (locale) => {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/events-page?populate=deep,4&locale=${locale}`,
  );
  return res.data;
};

const fetchAnotherEventData = async () => {
  const startOfCurrentMonth = dayjs()
    .startOf("month")
    .subtract(6, "day")
    .format("YYYY-MM-DD");

  const startOfNextMonth = dayjs()
    .startOf("month")
    .add(1, "month")
    .add(6, "day")
    .format("YYYY-MM-DD");
  //`https://admin.it-ea.uz/api/events?filters[date][$gte]=${startOfCurrentMonth}&filters[date][$lt]=${startOfNextMonth}&populate=deep`,
  const res = await axios.get(
    `https://admin.it-ea.uz/api/events?filters[date][$gte]=${startOfCurrentMonth}&populate=deep`,
  );
  return res.data;
};

async function Events({ params: { locale } }) {
  const eventData = await fetchEventData(locale);
  const anotherEventData = await fetchAnotherEventData();
  const categories = await fetchCategories();
  const translations = useTranslations(locale);

  return (
    <>
      <HeroEvents heroData={eventData} />
      <Dates anotherEventData={anotherEventData.data} />
      <section className="flex flex-col gap-10 px-6 xs:py-12 sm:py-24 md:py-24 lg:py-24 xl:py-24 2xl:py-24">
        {categories?.data?.map((category, i) => (
          <Category
            category={category}
            locale={locale}
            translations={translations.common}
            key={category.id}
            index={i}
          />
        ))}
      </section>
    </>
  );
}

export default Events;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "events",
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
