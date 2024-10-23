import React from "react";

import axios from "axios";

import { DataTableDemo } from "@/components/common/ratingtable";

import { PAGE_SIZE } from "@/constants";

import HeroBanner from "./components/HeroBanner";
import OrganizationRatings from "./components/OrganizationRatings";
import Purpose from "./components/Purpose";

const fetchData = async (locale) => {
  const data = await axios.get(
    `https://admin.it-ea.uz/api/rating-page?populate=deep&locale=${locale}`,
  );
  const { data: rating } = await axios.get(
    `https://admin.it-ea.uz/api/organization-ratings?populate=deep&pagination[page]=1&pagination[pageSize]=${PAGE_SIZE}&filters[organization_type][id][$eq]=1&sort[0]=id:asc`,
  );
  const {
    data: { data: orgType },
  } = await axios.get(
    `https://admin.it-ea.uz/api/organization-types?sort[0]=id:asc&populate[0]=name`,
  );

  return { data: data.data.data.attributes, rating, orgType };
};

async function Rating({ params: { locale } }) {
  const { data, rating, orgType } = await fetchData(locale);

  return (
    <>
      <HeroBanner data={data.banner} />
      <Purpose purpose={data.purpose} cards={data.cards} />
      <OrganizationRatings
        data={data.ratingData}
        rating={rating}
        orgType={orgType}
      />
    </>
  );
}

export default Rating;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "rating",
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
