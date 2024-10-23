"use client";

import React, { useEffect, useRef } from "react";

import axios from "axios";
import { enUS, ru, uz } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Calendar } from "@/components/ui/calendar";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useTranslations from "@/hooks/utils/use-translation";

const css = `
  .my-today {
    background: #40B3E7;
    border-radius: 50%;
    color: #fff; 
 }

`;

const calendarLocales = {
  en: enUS,
  ru: ru,
  uz: uz,
};

function Dates({ anotherEventData }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const _locale = locale === "uz" ? "uz-latn" : locale;

  const [currentMonth, setCurrentMonth] = React.useState(dayjs());
  const [events, setEvents] = React.useState(anotherEventData);
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  async function fetchEventsForMonth(month) {
    const startOfMonth = month
      .startOf("month")
      .subtract(6, "day")
      .format("YYYY-MM-DD");
    const endOfMonth = month
      .startOf("month")
      .add(1, "month")
      .add(6, "day")
      .format("YYYY-MM-DD");
    //  `https://admin.it-ea.uz/api/events?filters[date][$gte]=${startOfMonth}&filters[date][$lt]=${endOfMonth}&populate=deep`,
    const res = await axios.get(
      `https://admin.it-ea.uz/api/events?filters[date][$gte]=${startOfMonth}&populate=deep`,
    );

    return res.data;
  }

  const filteredData = events?.filter((item) => {
    const itemDate = dayjs(item.attributes.date);
    console.log(itemDate.day(), currentMonth.day());
    return itemDate.month() >= currentMonth.month();
    return itemDate.month() === currentMonth.month();
  });

  function onMonthChange(e) {
    setCurrentMonth(dayjs(e));
    fetchEventsForMonth(dayjs(e)).then((data) => {
      setEvents(data.data);
    });
  }

  const eventDays = events.map((event) => new Date(event.attributes.date));

  const modifiers = {
    highlighted: eventDays,
    eventDay: eventDays,
  };

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__fadeInUp",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <>
      <style>{css}</style>
      <section className="bg bg-customGray xs:mt-[72px] sm:mt-32 md:mt-32 lg:mt-32 xl:mt-32 2xl:mt-32">
        <div
          ref={elementRef}
          className="mx-auto w-full max-w-[1190px] px-6 opacity-0 xs:py-[78px] sm:py-[120px] md:py-[120px] lg:py-[120px] xl:py-[120px] 2xl:py-[120px]"
        >
          <span className="text-lg font-medium text-customSilver">
            {translations.events?.dates?.suptitle}
          </span>
          <h2 className="font-semibold text-customBlack xs:text-[40px] sm:text-[52px] md:text-[52px] lg:text-[52px] xl:text-[52px] 2xl:text-[52px]">
            {translations.events?.dates?.title}
          </h2>
          <p className="mt-4 w-full max-w-[601px] text-lg text-customSilver">
            {translations.events?.dates?.description}
          </p>

          <div className="mt-16 flex flex-wrap gap-x-5 xs:justify-center sm:justify-center md:justify-center lg:justify-center xl:justify-between 2xl:justify-between ">
            <Calendar
              locale={calendarLocales[locale]}
              onMonthChange={onMonthChange}
              mode="single"
              modifiers={modifiers}
              // modifiersStyles={modifiersStyles}
              selected={new Date()}
              className="w-full max-w-[328px] grow items-center justify-center border bg-white"
              modifiersClassNames={{
                today: "my-today",
                eventDay: "your-custom-class-name fin",
              }}
            />
            <div className="w-full xs:mt-[32px] xs:max-w-[328px] sm:mt-8 sm:max-w-[768px] md:mt-0 md:max-w-[768px] lg:mt-0 lg:max-w-[768px] xl:mt-0 xl:max-w-[768px] 2xl:mt-0 2xl:max-w-[768px]">
              {console.log(events)}

              {events.length > 0 && (
                <>
                  <b className="block text-2xl capitalize">
                    {dayjs(currentMonth).locale(_locale).format("MMMM")}
                  </b>
                  {filteredData.map((item) => {
                    return (
                      <Link
                        href={`events/${item.attributes.event_category.data.id}/${item.id}`}
                        key={item.id}
                      >
                        <div className="mt-4 max-w-[768px] border bg-white px-6 py-6">
                          <h3>
                            {item?.attributes?.title?.[`title_${locale}`]}
                          </h3>
                          <span className="text-customSilver">
                            {dayjs(item.attributes.date)
                              .locale(_locale)
                              .format("MMMM D, YYYY")}
                          </span>
                          <span className="ml-4 text-customSilver">
                            {item.attributes.location}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dates;
