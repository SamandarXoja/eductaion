"use client";

import React from "react";

import { CheckCircle, X, XCircle, XIcon } from "lucide-react";
import { useParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useTranslations from "@/hooks/utils/use-translation";

function PaymentFailureDialog({ toggle }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);

  return (
    <AlertDialog
      open={toggle.isOpen}
      onOpenChange={toggle.set}
      className="padding-modal"
    >
      <AlertDialogContent className="flex max-w-[480px] flex-col items-center gap-6 border-0 !pt-8">
        <AlertDialogHeader className="space-y-0 !text-center">
          <div className="mx-auto mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#f6c6c6]">
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#e87070]">
              <XCircle className="h-5 w-5 text-[#fff]" />
            </div>
          </div>
          <AlertDialogTitle className="!mb-3 text-center text-[32px] font-semibold leading-9 text-[#0A0A0A]">
            {translations.membership?.payment_failure_dialog?.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {translations.membership?.payment_failure_dialog?.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="modal-flex justify-start">
          <AlertDialogAction className="min-h-[52px] w-[240px] flex-1 rounded-[1000px] text-base font-semibold">
            {translations.common?.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymentFailureDialog;
