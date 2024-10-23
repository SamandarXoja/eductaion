"use client";

import React, { useEffect, useRef } from "react";

import Markdown from "react-markdown";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import useOnScreen from "@/hooks/utils/use-on-screen";

function AccordionMembership({ data }) {
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
    <Accordion
      ref={elementRef}
      type="single"
      collapsible
      className="mx-auto w-full max-w-[1040px] px-3 opacity-0"
    >
      {data.map((item) => {
        return (
          <AccordionItem
            key={item.id}
            value={`item-${item.id}`}
            className="mb-3 border bg-white px-2"
            defaultValue={`item-${item.id}`}
          >
            <AccordionTrigger className="w-full font-semibold hover:no-underline">
              {item?.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              <Markdown>{item?.description}</Markdown>
              {/* {item?.description} */}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default AccordionMembership;
