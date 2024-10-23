"use client";

import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";

import { Check } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import useOnScreen from "@/hooks/utils/use-on-screen";
import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { fetchProfile } from "@/services/api/profile";

import { formatPrice } from "@/services";

import PaymeContact from "../payme-contact";
import PaymentDialog from "../payment-dialog";
import PaymentFailureDialog from "../payment-failure-dialog";
import PaymentSuccessDialog from "../payment-success-dialog";

function Cards({ data }) {
  const { locale } = useParams();
  const { push } = useRouter();
  const translations = useTranslations(locale);
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [item, setItem] = useState(null);

  const elementRef = useRef(null);
  const isOnScreen = useOnScreen(elementRef);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!!token) {
      fetchProfile().then((profile) => {
        setProfile(profile);
      });
    }
  }, []);

  const dialogToggle = useToggle();
  const dialogSuccessToggle = useToggle();
  const dialogFailureToggle = useToggle();
  const dialogContactToggle = useToggle();

  const handleButtonClick = (item, isLast) => {
    if (isLast) {
      dialogContactToggle.open();
    } else if (profile) {
      dialogToggle.open();
      setItem(item);
    } else {
      push(`/${locale}/login`);
    }
  };

  useEffect(() => {
    if (searchParams.get("show") === "dialog") {
      dialogSuccessToggle.open();
    }
  }, []);

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
      <Suspense>
        <PaymentSuccessDialog toggle={dialogSuccessToggle} />
      </Suspense>
      <PaymentFailureDialog toggle={dialogFailureToggle} />
      <PaymeContact toggle={dialogContactToggle} />
      <PaymentDialog
        profile={profile}
        membership={item}
        toggle={dialogToggle}
      />
      <div
        ref={elementRef}
        className="animate__delay-1s mt-20 flex flex-wrap justify-center gap-6 opacity-0"
      >
        {data?.map((item, index, array) => {
          const isLast = false;
          // array.length > 2 ? index === array.length - 1 : false;
          const isBought = item.id === profile?.membership?.id;

          return (
            <Fragment key={item.id}>
              <div
                className={`cardsbg ${item.attributes.isMostPopular ? "bg-customBlue" : "bg-white"}  relative flex min-h-[554px] w-full max-w-[370px] flex-col justify-between border px-8 py-8  shadow-md`}
              >
                
                <div>
                  {item.attributes.isMostPopular ? (
                    <div className="cardsbg1 absolute -top-[7px] right-[25px] inline-flex  justify-center rounded-full bg-primary px-3 py-[7px] font-medium text-customBlue">
                      <span className="block text-xs font-medium">
                        🔥 {translations.common?.most_popular}
                      </span>
                    </div>
                  ) : null}
                  <div className="border-b ">
                    <h4
                      className={`${item.attributes.isMostPopular ? "text-white" : "text-[#0A0A0A]"} text-lg font-semibold text-customBlack`}
                    >
                      {item?.attributes?.title}
                    </h4>
                    <p
                      className={`${item?.attributes?.isMostPopular ? "most" : "ismost"} font-normal`}
                    >
                      {item?.attributes?.description?.[`description_${locale}`]}
                    </p>
                    <p className="mb-6 mt-3 ">
                      <b
                        className={`${item.attributes.isMostPopular ? "text-white" : "text-[#0A0A0A]"} text-4xl `}
                      >
                        {item?.attributes?.amount
                          .toLocaleString()
                          .replaceAll(",", " ") + " so’m"}
                      </b>
                      <span className="text-gray-400">
                        /{translations.common?.month}
                      </span>
                    </p>
                  </div>
                  <ul className="mt-6 flex flex-col gap-3">
                    {item?.attributes?.info?.[`info_${locale}`].map((el) => {
                      return (
                        <li className="flex gap-5" key={el.id}>
                          <div>
                            <Check color="#737373" />
                          </div>
                          <span
                            className={`${item.attributes.isMostPopular ? "text-customCart" : "text-customSilver"}`}
                          >
                            {el.item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Button
                  disabled={isBought}
                  variant={isLast ? "outline" : "default"}
                  size="xl"
                  onClick={() => handleButtonClick(item, isLast)}
                >
                  {isBought ? (
                    <>
                      {translations.common?.your_plan}
                      <Check className="ml-2 h-5 w-5" />
                    </>
                  ) : isLast ? (
                    translations.common?.contact_us
                  ) : (
                    translations.common?.get_started
                  )}
                </Button>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

export default Cards;
