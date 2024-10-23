import axios from "axios";

import useTranslations from "@/hooks/utils/use-translation";

import Education from "./home-components/Education";
import HeroBanner from "./home-components/HeroBanner";
import Rating from "./home-components/Rating";
import Projects from "./home-components/projects";

const fetchHomepageData = async ({ locale }) => {
  const res = await axios.get(
    `https://admin.it-ea.uz/api/homepage?populate=deep&locale=${locale}`,
  );
  const {
    data: { data: rating },
  } = await axios.get(
    "https://admin.it-ea.uz/api/organization-ratings?populate=deep&pagination[page]=1&pagination[pageSize]=10",
  );

  return {
    data: res.data.data,
    rating,
  };
};

export default async function Home({ params: { locale } }) {
  const { data, rating } = await fetchHomepageData({ locale });
  const translations = useTranslations(locale);

  return (
    <main>
      <HeroBanner data={data?.attributes.banner} />
      {data.attributes.organizationRating.title && (
        <Rating rating={rating} data={data.attributes.organizationRating} />
      )}
      <br />
      <Projects
        data={data?.attributes.activities}
        title={data?.attributes?.activityTitle}
      />
      <Education data={data?.attributes?.education} />
    </main>
  );
}

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "home",
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
