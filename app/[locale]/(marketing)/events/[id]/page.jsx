import React from "react";

import axios from "axios";
import dayjs from "dayjs";

import useTranslations from "@/hooks/utils/use-translation";

import Card from "./components/card";
import Header from "./components/header";

const fetchAnotherEventData = async (id) => {
  const { data } = await axios.get(
    `https://admin.it-ea.uz/api/event-categories/${id}?populate=deep`,
  );

  return data;
};

async function Category({ params: { id, locale } }) {
  const _locale = locale === "uz" ? "uz-latn" : locale;
  const translations = useTranslations(locale);
  const data = await fetchAnotherEventData(id);

  return (
    <div className=" bgs pb-24" style={{ backgroundColor: "#FAFAFA" }}>
      <Header
        title={data?.data?.attributes?.title?.[`title_${locale}`]}
        description={
          data?.data?.attributes?.description?.[`description_${locale}`]
        }
      />

      <div className="flex flex-col gap-10">
        {data?.data?.attributes?.events?.data.map((item) => (
          <Card
            key={item.id}
            data={item}
            categoryId={id}
            formattedDate={dayjs(item?.attributes?.date)
              .locale(_locale)
              .format("MMMM D, YYYY")}
            locale={locale}
            translations={translations.common}
          />
        ))}
      </div>
    </div>
  );
}

export default Category;

export async function generateMetadata({ params: { id, locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/event-categories/${id}?populate=deep`,
  );
  const data = res.data.data.attributes;

  const previousImages = (await parent).openGraph?.images || [];

  if (data)
    return {
      title: data.title?.[`title_${locale}`],
      description: data.description?.[`description_${locale}`],
      openGraph: {
        title: data.title?.[`title_${locale}`],
        description: data.description?.[`description_${locale}`],
        url: "https://www.ite-association.uz/",
        images: [
          `https://admin.it-ea.uz${data?.image?.data?.attributes?.url}`,
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title?.[`title_${locale}`],
        description: data.description?.[`description_${locale}`],
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
