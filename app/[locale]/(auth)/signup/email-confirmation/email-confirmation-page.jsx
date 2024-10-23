"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";

import useTranslations from "@/hooks/utils/use-translation";

import { emailConfirmation } from "@/services/api/auth";

function EmailConfirmation() {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get("confirmation");
  const { locale } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const translations = useTranslations(locale);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (confirmationCode) {
      emailConfirmation(confirmationCode)
        .catch(() => {
          toast({
            variant: "destructive",
            title: translations.email_confirmation?.failed_text,
          });
        })
        .finally(() => {
          setLoading(false);
          router.push(`/${locale}/login`);
        });
    } else {
      toast({
        variant: "destructive",
        title: translations.email_confirmation?.not_found_text,
      });

      setLoading(false);
    }
  }, [confirmationCode, locale, router, translations]);

  if (loading) {
    return <p>{translations.common?.loading}...</p>;
  }

  return null;
}

export default EmailConfirmation;
