import React from "react";

import axios from "axios";
import dayjs from "dayjs";
import Markdown from "react-markdown";

import Banner from "./components/banner";
import Header from "./components/header";

const fetchEvent = async (id) => {
  const { data } = await axios.get(
    `https://admin.it-ea.uz/api/events/${id}?populate=deep`,
  );

  return data;
};

async function Details({ params }) {
  const _locale = params.locale === "uz" ? "uz-latn" : params.locale;
  const data = await fetchEvent(params["event-id"]);

  return (
    <>
      <Header
        date={dayjs(data.data.attributes.date)
          .locale(_locale)
          .format("MMMM D, YYYY")}
        title={data.data.attributes.title[`title_${params.locale}`]}
        description={
          data.data.attributes.description[`description_${params.locale}`]
        }
      />
      <div className="mb-24 mt-12">
        <Banner
          src={`https://admin.it-ea.uz${data.data.attributes.image.data.attributes.url}`}
        />

        <div className="mx-auto mt-12 w-full max-w-[950px] px-[15px]">
          <div className="mb-12 h-[1px] border"></div>
          <div className="flex flex-col gap-5">
            <Markdown>
              {data.data.attributes.info[`info_${params.locale}`]}
            </Markdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;

export async function generateMetadata({ params }, parent) {
  // fetch data

  const res = await axios.get(
    `https://admin.it-ea.uz/api/events/${params["event-id"]}?populate=deep`,
  );
  const data = res.data.data.attributes;

  const previousImages = (await parent).openGraph?.images || [];
  if (data)
    return {
      title: data.title?.[`title_${params.locale}`],
      description: data.description?.[`description_${params.locale}`],
      openGraph: {
        title: data.title?.[`title_${params.locale}`],
        description: data.description?.[`description_${params.locale}`],
        url: "https://www.ite-association.uz/",
        images: [
          `https://admin.it-ea.uz${data?.image?.data?.attributes?.url}`,
          ...previousImages,
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title?.[`title_${params.locale}`],
        description: data.description?.[`description_${params.locale}`],
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
