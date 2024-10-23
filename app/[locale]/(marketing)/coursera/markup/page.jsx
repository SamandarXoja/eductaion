import axios from "axios";
import { Award, Coins, CoinsIcon, HandIcon, LucideCoins } from "lucide-react";
import { Poppins } from "next/font/google";
import Markdown from "react-markdown";

import useTranslations from "@/hooks/utils/use-translation";

import { cn } from "@/lib/utils";

import Courses from "./components/Courses";

const fetchData = async (locale) => {
  const data = await axios.get(
    `https://admin.it-ea.uz/api/course-markup-page?populate=deep&locale=${locale}`,
  );
  const categories = await axios.get(
    `https://admin.it-ea.uz/api/course-markup-categories?populate=deep`,
  );

  return {
    data: data.data.data.attributes,
    categories: categories.data.data,
  };
};
// eslint-disable-next-line @next/next/no-async-client-component

const popins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

async function Markup({ params: { locale } }) {
  const {
    data: { title, description },
    categories,
  } = await fetchData(locale);
  const translations = useTranslations(locale);

  return (
    <>
      <section className={"bg-[#FAFAFA]/50 pb-10"}>
        <div className="px-4 pb-20 pt-20 text-center">
          <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-[4px]">
            <LucideCoins color="#fff" />
            <span className="text-sm font-medium text-white">
              {translations?.courses.markup}
            </span>
          </div>
          <h1 className="font-semibold text-customBlack xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl">
            {title}
          </h1>
          <p className="text-gray-500 text-lg sm:text-base xl:text-lg 2xl:text-lg">
            {description}
          </p>
        </div>
      </section>
      <Courses data={categories} className={popins.className} />
    </>
  );
}

export default Markup;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "coursera-markup",
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
