"use client";

import { useEffect, useRef } from "react";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";

import { cn } from "@/lib/utils";

function PlanCard({
  plan,
  onClick,
  duration,
  isBought,
  boughtText,
  price,
  index,
}) {
  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    if (isOnScreen) {
      elementRef.current.classList.add(
        "opacity-100",
        "animate__animated",
        "animate__bounceIn",
      );
    }
  }, [elementRef, isOnScreen]);

  return (
    <div
      ref={elementRef}
      className="animate__delay-1s w-full max-w-[271px] rounded-[40px] border bg-card p-[32px] opacity-0"
    >
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-[100px] px-4 py-2 text-center text-lg font-semibold text-[#fff]",
          {
            "bg-[#B08D57]": index === 0,
            "bg-[#D3D4D7]": index === 1,
            "bg-[#FDDC5C]": index === 2,
            "bg-[#A2450C]": index === 3,
          },
        )}
      >
        {plan.attributes?.title}
      </div>
      <h3 className="mt-3 text-[32px] font-semibold first-letter:capitalize">
        {duration}
      </h3>
      <Button
        disabled={isBought}
        onClick={onClick}
        className="mt-8 h-[52px] w-full rounded-full text-base font-semibold hover:bg-primary-darker"
      >
        {isBought ? (
          <>
            {boughtText}
            <Check className="ml-2 h-5 w-5" />
          </>
        ) : (
          price
        )}
      </Button>
    </div>
  );
}

export default PlanCard;
