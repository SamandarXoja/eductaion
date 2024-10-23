import axios from "axios";

import useTranslations from "@/hooks/utils/use-translation";

import { fetchContactInfo } from "@/services/api/contact-info";

import Certificate from "./components/certificate";
import Contacts from "./components/contacts";
import Header from "./components/header";

const fetchData = async (locale) => {
  const data = await axios.get(
    `https://admin.it-ea.uz/api/certification-page?populate=deep&locale=${locale}`,
  );

  return data.data.data.attributes;
};
async function Certification({ params: { locale } }) {
  const { banner, certificates, pageInfo } = await fetchData(locale);
  const { data: contactInfo } = await fetchContactInfo();
  const translations = useTranslations(locale);
  return (
    <>
      <section className="bg-[#FAFAFA]/50 pb-24">
        <Header
          subtitle={translations.common?.certification}
          title={banner.title}
        />
        <section className="flex flex-col gap-8">
          {certificates.map((certificate, i) => (
            <Certificate
              key={certificate.id}
              certificate={certificate}
              translations={translations.common}
              index={i}
            />
          ))}
        </section>
      </section>
      <Contacts
        pageInfo={pageInfo}
        contactInfo={contactInfo}
        translations={translations.common}
      />
    </>
  );
}

export default Certification;

export async function generateMetadata({ params: { locale } }, parent) {
  // fetch data
  const res = await axios.get(
    `https://admin.it-ea.uz/api/web-context?populate=deep&locale=${locale}`,
  );
  const data = res.data.data.attributes.context.find(
    (item) => item.page === "certification",
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
