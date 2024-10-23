import React, { Suspense } from "react";

import axios from "axios";

import Common from "./component/common";

const fetchPageData = async (locale) => {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/privacy-policy?populate=deep&locale=${locale}`,
  );

  return res.data.data.attributes;
};

async function PrivacyPolicy({ params: { locale } }) {
  const data = await fetchPageData(locale);

  return (
    <Suspense>
      <Common data={data} />
    </Suspense>
  );
}

export default PrivacyPolicy;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "privacy-policy",
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
