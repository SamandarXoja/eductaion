"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useTranslations from "@/hooks/utils/use-translation";

import PersonCard from "./person-card";

function Team({ data }) {
  const params = useParams();
  const translations = useTranslations(params.locale);

  return (
    <section className="mt-[24px]">
      <div className="mx-auto w-full max-w-[1190px] px-4 py-4">
        <span>{translations.common?.team}</span>
        <h2 className="mt-4 max-w-[800px] font-semibold leading-[120%] xs:text-[40px] sm:text-[40px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
          {data?.teamIntro?.title}
        </h2>
        <p className="text-gray-500 mt-4 max-w-[850px] text-lg">
          {data?.description?.description}
        </p>
      </div>
      {data.teams.map((item) => {
        return (
          <div
            className="mx-auto mb-4 w-full max-w-[1190px] px-4 py-4"
            key={item.id}
          >
            <div className="mb-8 flex items-center xs:justify-start xs:gap-8 sm:justify-between sm:gap-0 md:justify-between md:gap-0 lg:justify-between lg:gap-0 xl:justify-between xl:gap-0 2xl:justify-between 2xl:gap-0">
              <h3 className="text-gray-500 w-full text-2xl font-semibold xs:mx-auto xs:w-[266px] sm:mx-0 sm:max-w-[600px] md:mx-0 md:max-w-[600px] lg:mx-0 lg:max-w-[600px] xl:mx-0 xl:max-w-[600px] 2xl:mx-0 2xl:max-w-[600px]">
                {item.name}
              </h3>
              <div className="gap-3 xs:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex">
                <button
                  className={`swiper-button-prev${item.id} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border`}
                >
                  <ArrowLeft color="#A3A3A3" />{" "}
                </button>
                <button
                  className={`swiper-button-next${item.id} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border`}
                >
                  {" "}
                  <ArrowRight color="#A3A3A3" />
                </button>
              </div>
            </div>
            <Swiper
              slidesPerView={4}
              slidesPerGroup={1}
              spaceBetween={30}
              navigation={{
                nextEl: `.swiper-button-next${item.id}`,
                prevEl: `.swiper-button-prev${item.id}`,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },

                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1550: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {item.members.map((team) => {
                return (
                  <SwiperSlide key={team.id}>
                    <PersonCard team={team} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="mt-6 justify-center gap-3 xs:flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
              <button
                className={`swiper-button-prev${item.id} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border`}
              >
                <ArrowLeft color="#A3A3A3" />{" "}
              </button>
              <button
                className={`swiper-button-next${item.id} flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border`}
              >
                {" "}
                <ArrowRight color="#A3A3A3" />
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Team;
