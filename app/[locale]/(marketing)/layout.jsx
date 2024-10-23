import "animate.css";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import { Inter_Tight } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

import { i18n } from "@/i18n-config";
import { cn } from "@/lib/utils";

import "../../globals.css";

const interTight = Inter_Tight({ subsets: ["latin"] });

export const revalidate = 0; // Disable caching

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function MarketingLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body
        className={cn(interTight.className, "max-w-[100%] !overflow-x-hidden")}
      >
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

export const metadata = {
  title: "IT EDUCATION ASSOCIATION",
  description:
    "Non-governmental non-profit organization focused on the development of education in the field of information and communication technologies",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "IT EDUCATION ASSOCIATION",
    description:
      "Non-governmental non-profit organization focused on the development of education in the field of information and communication technologies",
    url: "https://www.ite-association.uz/",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT EDUCATION ASSOCIATION",
    description:
      "Non-governmental non-profit organization focused on the development of education in the field of information and communication technologies",
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
