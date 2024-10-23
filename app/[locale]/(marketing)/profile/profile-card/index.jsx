"use client";

import React from "react";

import dayjs from "dayjs";
import {
  Loader,
  Pen,
  PenBox,
  PenBoxIcon,
  PenLine,
  PenLineIcon,
  PenSquare,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import useTranslations from "@/hooks/utils/use-translation";

import plan1Img from "@/public/images/plan-logos/1.png";
import plan2Img from "@/public/images/plan-logos/2.png";
import plan3Img from "@/public/images/plan-logos/3.png";
import plan4Img from "@/public/images/plan-logos/4.png";

import EditDialog from "./edit-dialog";
import EditEmail from "./edit-email";
import EditPassword from "./edit-password";

const planImages = {
  1: plan1Img,
  2: plan1Img,
  3: plan2Img,
  4: plan2Img,
  5: plan2Img,
  6: plan3Img,
  7: plan3Img,
  8: plan3Img,
  9: plan4Img,
  10: plan4Img,
  11: plan4Img,
  12: plan4Img,
};

function ProfileCard({ profile, setProfile, isLoading }) {
  const { locale } = useParams();

  const translations = useTranslations(locale);
  return (
    <div className="mx-auto mb-16 w-full max-w-[920px] divide-y border bg-background shadow-md">
      {isLoading ? (
        <div className="flex h-[350px] items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start justify-between space-y-6 p-8 lg:flex-row lg:items-center lg:space-x-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-[60px] w-[60px] border border-primary-light md:h-[120px] md:w-[120px]">
                  <AvatarImage src="https://github.com/shaddcn.png" />
                  <AvatarFallback className="bg-[#F0FBFF] text-xl font-semibold text-primary md:text-5xl">
                    {(profile.lastName || "").charAt(0)}
                    {(profile.firstName || "").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="md:space-y-1.5">
                  <h2 className="text-xl font-semibold text-customBlack md:text-3xl">
                    {profile.lastName || ""} {profile.firstName || ""}
                  </h2>
                  <div className="flex items-center gap-2 text-lg text-customSilver">
                    <span className="max-w-full break-all">
                      {profile.email}
                    </span>
                    <EditEmail profile={profile} setProfile={setProfile} />
                  </div>
                </div>
              </div>
              <div className="text-lg text-customSilver">
                {translations.profile.date_of}{" "}
                <span className="text-customBlack">
                  {dayjs(profile.createdAt).format("DD.MM.YYYY")}
                </span>
              </div>
            </div>
            <div className="grid gap-4">
              <EditDialog profile={profile} setProfile={setProfile} />
              <EditPassword profile={profile} setProfile={setProfile} />
            </div>
          </div>
          <div className="px-8 py-6">
            {profile.courseraSubscription ? (
              <div className="grid grid-cols-3 items-center">
                <div className="flex items-center space-x-2">
                  <Image
                    src={planImages[profile.courseraSubscription?.duration]}
                    width={64}
                    height={64}
                    alt={profile.courseraSubscription?.title}
                  />
                  <div>
                    <div className="text-sm text-customSilver">Your plan</div>
                    <div className="text-2xl font-semibold leading-7 text-customBlack">
                      {profile.courseraSubscription?.title}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-customSilver">Start date</div>
                  <div className="font-medium text-customBlack">
                    {dayjs(profile.courseraExpireDate)
                      .subtract(profile.courseraSubscription?.duration, "month")
                      .format("DD.MM.YYYY")}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-customSilver">End date</div>
                  <div className="font-medium text-customBlack">
                    {dayjs(profile.courseraExpireDate).format("DD.MM.YYYY")}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Image
                  src={plan1Img}
                  width={64}
                  height={64}
                  alt="Bronze"
                  className="opacity-30"
                />
                <span className="text-lg font-medium text-customSilver">
                  {translations.profile.no_tariff}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
