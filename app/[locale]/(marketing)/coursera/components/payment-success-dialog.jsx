"use client";

import React from "react";

import { CheckCircle, Mail } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

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

import { removeQueryString } from "@/services/query-string";

function PaymentSuccessDialog({ toggle }) {
  const { locale } = useParams();
  const pathname = usePathname();
  const translations = useTranslations(locale);
  const searchParams = useSearchParams();
  const router = useRouter();

  function onClick(open) {
    router.replace(pathname);
    toggle.set(open);
  }

  return (
    <AlertDialog
      open={toggle.isOpen}
      onOpenChange={onClick}
      className="padding-modal"
    >
      <AlertDialogContent className="flex max-w-[480px] flex-col items-center gap-6 border-0 !pt-8">
        <AlertDialogHeader className="space-y-0 !text-center">
          <div className="mx-auto mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#7bccf1]">
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#40B3E7]">
              <Mail className="h-5 w-5 text-[#fff]" />
            </div>
          </div>
          <AlertDialogTitle className="!mb-3 text-center text-[32px] font-semibold leading-9 text-[#0A0A0A]">
            {translations.coursera_home?.payment_title}
          </AlertDialogTitle>
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

export default PaymentSuccessDialog;
