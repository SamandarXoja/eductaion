"use client";

import React, { useEffect } from "react";
import { useRef } from "react";

import Image from "next/image";
import Markdown from "react-markdown";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import useOnScreen from "@/hooks/utils/use-on-screen";

function LeadershipItem({ leader }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

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
    <div
      ref={elementRef}
      className="mb-8 flex border bg-customGray opacity-0 xs:flex-col xs:items-start sm:flex-col sm:items-center md:flex-col md:items-center lg:flex-row lg:items-start xl:flex-row xl:items-start 2xl:flex-row 2xl:items-start"
    >
      <div className="w-full max-w-80  xs:p-4 sm:p-4 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
        <Image
          className="object-cover xs:w-[288px] sm:w-[288px] md:w-60 lg:w-60 xl:w-60 2xl:w-60"
          src={`https://admin.it-ea.uz${leader?.image?.data?.attributes?.url}`}
          width={240}
          height={256}
          alt="leader-foto"
        />
        <b className="mt-[32px] block text-[32px]">{leader.name}</b>
        <p className="text-gray-400 mt-3 text-lg">{leader.job_title}</p>

        <div className="mt-8 flex items-center gap-4">
          {leader.social_media.map((el, index) => {
            const size = index === 2 ? 20 : 24;

            return (
              <a href={el.link} key={el.id}>
                <Image
                  src={`https://admin.it-ea.uz${el?.icon?.data?.attributes?.url}`}
                  width={size}
                  height={size}
                  priority
                  alt="social icon"
                />
              </a>
            );
          })}
        </div>
        <p className="mt-3">{}</p>
        <a className="text-customBlue" href={`tel:${leader.phoneNumber}`}>
          {leader.phoneNumber}
        </a>
      </div>

      <div className="w-full max-w-[1040px] flex-wrap border-l xs:mt-[18px] xs:pb-0 sm:mt-0 sm:p-10 sm:pb-10 md:mt-0  md:p-10 md:pb-10 lg:mt-0 lg:p-10 lg:pb-10 xl:mt-0 xl:p-10 xl:pb-10 2xl:mt-0 2xl:p-10 2xl:pb-10">
        <div className="xs:px-4 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:p-0">
          <div className="flex flex-col items-center bg-white px-8 py-8 text-center shadow-sm">
            <Image
              src="/icons/switch.svg"
              width={40}
              height={34}
              alt="icon"
              priority
            />
            <p className="mb-8 mt-8 text-lg leading-[150%] text-customBlack ">
              {leader.quote}
            </p>

            <p className="text-lg text-customBlack">— {leader.name}</p>
          </div>
        </div>

        <div className="xs:p-4 xs:pb-0 sm:p-0 md:p-0 lg:p-0 xl:p-0 2xl:p-0">
          <Accordion type="single" collapsible className="mt-8 w-full">
            {leader.leaders_info.map((element) => {
              return (
                <AccordionItem
                  key={element.id}
                  value={`item-${element.id}`}
                  className="mb-3 border bg-white px-2"
                  defaultValue="item-1"
                >
                  <AccordionTrigger className="truncate text-lg font-semibold hover:no-underline">
                    {element.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Markdown>{element.description}</Markdown>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default LeadershipItem;
