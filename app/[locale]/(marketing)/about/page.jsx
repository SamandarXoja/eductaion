import React from "react";

import axios from "axios";

import HeroBanner from "./components/HeroBanner";
import Organization from "./components/Organization";
import Structure from "./components/Structure";
import Leadership from "./components/leadership";
import Team from "./components/team";

const fetchAboutData = async (locale) => {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/about-us-page?populate=deep,4&locale=${locale}`,
  );

  return res.data.data;
};

async function About({ params }) {
  const { attributes = {} } = await fetchAboutData(params.locale);

  return (
    <>
      <HeroBanner data={attributes} />
      <Leadership data={attributes} />
      <Team data={attributes} />
      <Organization data={attributes} />

      {!!attributes.structure?.title && <Structure data={attributes} />}
    </>
  );
}

export default About;

export async function generateMetadata({ params: { locale } }, parent) {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "about",
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
