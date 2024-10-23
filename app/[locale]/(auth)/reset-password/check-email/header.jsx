import React from "react";

import { Mail } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

import useTranslations from "@/hooks/utils/use-translation";

import Description from "../../components/description";
import Title from "../../components/title";

function Header() {
  const params = useParams();
  const translations = useTranslations(params.locale);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary-light">
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary">
          <Mail className="h-5 w-5 text-primary-dark" />
        </div>
      </div>
      <Title>{translations.reset_password?.check_email?.title}</Title>
      <Description
        dangerouslySetInnerHTML={{
          __html:
            translations.reset_password?.check_email?.description?.(email),
        }}
      />
    </div>
  );
}

export default Header;
