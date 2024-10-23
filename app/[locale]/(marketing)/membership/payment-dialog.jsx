"use client";

import React from "react";

import base64 from "base-64";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import useTranslations from "@/hooks/utils/use-translation";

import { pay } from "@/services/api/payment";

import { formatPrice } from "@/services";

export const paymeUrl = process.env.NEXT_PUBLIC_PAYME_URL;
export const paymeMerchantId =
  process.env.NEXT_PUBLIC_PAYME_MEMBERSHIP_MERCHANT_ID;

function PaymentDialog({ profile, membership, toggle }) {
  const router = useRouter();
  const { locale } = useParams();
  const translations = useTranslations(locale);

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      data: {
        totalAmount: membership.attributes.amount,
        membership: membership.id,
        user: profile.id,
        serviceFor: "membership",
      },
    };

    pay(values).then(({ data }) => {
      const paymentId = data.data.id;
      const amount = data.data.attributes.totalAmount * 100; // amount tiyinda, 100 tiyin = 1 so'm

      const encodedString = base64.encode(
        `m=${paymeMerchantId};ac.payment_id=${paymentId};a=${amount};c=${window.location.href}?show=dialog&planName=${membership?.attributes?.title}`,
      );

      router.push(`${paymeUrl}/${encodedString}`);
    });
  };
  return (
    <AlertDialog
      open={toggle.isOpen}
      onOpenChange={(open) => toggle.set(open)}
      className="padding-modal"
    >
      <AlertDialogContent className="max-w-[480px] border-0 p-0">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div
                className="absolute right-[22px] top-[22px] cursor-pointer"
                onClick={(open) => toggle.set(!open)}
              >
                <X />
              </div>
              <div className="flex gap-4 px-6 pt-6">
                <div className="flex h-12 w-12 items-center justify-center border">
                  <Image
                    src="/icons/coins-hand.svg"
                    width={24}
                    height={24}
                    alt="buyin icon"
                  />
                </div>
                <div>
                  <b className="text-lg font-semibold">
                    {translations.membership?.payment_dialog?.title(
                      membership?.attributes?.title,
                    )}
                  </b>
                  <p className="text-sm text-[#475467]">
                    {translations.membership?.payment_dialog?.subtitle}
                  </p>
                </div>
              </div>
              <div className="hr"></div>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="px-6 pt-2">
                <div className="flex items-center justify-between">
                  <b className="font-semibold text-[#0A0A0A]">
                    {translations.common?.total}
                  </b>
                  <span className="font-normal text-[#525252]">
                    {formatPrice(membership?.attributes?.amount)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-[160%] text-[#475467]">
                  {membership?.attributes?.paymentInfo?.[`info_${locale}`]}
                </p>
              </div>

              <div className="hr"></div>

              <label
                htmlFor="termsCheckbox"
                className="flex items-center gap-3 px-6 pt-6"
              >
                <Checkbox id="termsCheckbox" required />
                <div
                  className="cursor-pointer select-none text-base font-medium text-[#0D0D12] [&_a]:underline"
                  dangerouslySetInnerHTML={{
                    __html: translations.membership?.payment_dialog?.terms_text(
                      "privacy-policy?show=payment",
                    ),
                  }}
                />
              </label>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="modal-flex flex justify-between pb-6 sm:justify-center">
            <AlertDialogCancel
              type="button"
              className="mt-0 w-full max-w-[210px] rounded-[1000px] text-sm font-semibold text-[#0A0A0A]"
            >
              {translations.common?.cancel}
            </AlertDialogCancel>
            <Button
              type="submit"
              className="mt-0 w-full max-w-[210px] rounded-[1000px] text-sm font-semibold"
            >
              {translations.common?.continue}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymentDialog;
