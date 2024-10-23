"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useToggle from "@/hooks/utils/use-toggle";

function Certificate({ certificate, translations, index }) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);
  const accordionToggle = useToggle(false);

  const truncateAtPoint = (text, limit) => {
    const end = text.indexOf(".", limit);
    return end === -1 ? text : text.substring(0, end + 1);
  };

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        index % 2 === 0 ? "animate__fadeInRight" : "animate__fadeInLeft",
      );
    }
  }, [index, elementRef, isOnScreen]);

  return (
    <Accordion
      ref={elementRef}
      type="single"
      collapsible
      className="mx-auto w-full px-0 opacity-0 xs:max-w-[600px] sm:max-w-[600px] md:max-w-[600px] lg:max-w-[920px] xl:max-w-[920px] 2xl:max-w-[920px]"
    >
      <AccordionItem
        value={`item-${certificate.id}`}
        className="mb-0 stars border bg-white p-4 shadow-md"
      >
        <div className="flex flex-wrap xs:justify-center sm:justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between">
          <Dialog>
            <DialogTrigger className="mb-auto">
              <Image
                className="mx-auto block cursor-pointer text-center lg:mx-0 xl:mx-0 2xl:mx-0"
                src={`https://admin.it-ea.uz${certificate.image.data.attributes.url}`}
                width={500}
                height={350}
                alt="certification"
              />
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] border-0 bg-transparent px-0 py-0">
              <Image
                className="w-full max-w-[1000px]"
                src={`https://admin.it-ea.uz${certificate.image.data.attributes.url}`}
                width={1000}
                height={700}
                priority
                alt="modal foto"
              />
            </DialogContent>
          </Dialog>

          <div className="w-full max-w-[365px] xs:mt-5 sm:mt-5 md:mt-5 lg:mt-0 xl:mt-0 2xl:mt-0">
            <h3 className="text-[32px] font-semibold">{certificate.title}</h3>
            <p className="mt-4 text-base leading-[150%] text-customSilver">
              {truncateAtPoint(certificate.description, 500)}
            </p>

            {!!certificate.description.substring(
              truncateAtPoint(certificate.description, 500).length,
            ).length &&
              !accordionToggle.isOpen && (
                <AccordionTrigger
                  className="justify-end gap-2 pb-0 pt-2 text-base  text-[#1A3560]"
                  onClick={accordionToggle.toggle}
                >
                  {translations?.read_more}
                </AccordionTrigger>
              )}
          </div>
        </div>

        <AccordionContent className="pb-0">
          <p className="mt-4 text-base leading-[150%] text-customSilver">
            {certificate.description.substring(
              truncateAtPoint(certificate.description, 500).length,
            )}
          </p>
          {accordionToggle.isOpen && (
            <AccordionTrigger
              className="justify-end gap-2 py-0 text-base text-[#1A3560]"
              onClick={accordionToggle.toggle}
            >
              {translations?.read_less}
            </AccordionTrigger>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Certificate;
