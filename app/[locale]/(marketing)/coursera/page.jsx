import React, { Suspense } from "react";

import axios from "axios";

import Card from "./components/Card";
import Certificates from "./components/Certificates";
import Herobanner from "./components/Herobanner";
import Subscription from "./components/Subscription";

const fetchPlans = async () => {
  const res = await axios.get(
    "https://admin.it-ea.uz/api/coursera-subscriptions?populate=deep&sort[0]=id:asc",
  );

  return res.data.data;
};

const fetchPageData = async (locale) => {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/coursera-homepage?populate=deep&locale=${locale}`,
  );

  return res.data.data;
};

async function Coursera({ params: { locale } }) {
  const plans = await fetchPlans();
  const data = await fetchPageData(locale);

  return (
    <>
      <Herobanner data={data} />
      <Suspense>
        <Subscription data={data} plans={plans} />
      </Suspense>
      <Card data={data} />
      <Certificates data={data} />
    </>
  );
}

export default Coursera;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "coursera",
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
