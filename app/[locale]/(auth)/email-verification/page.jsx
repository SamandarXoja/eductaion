"use client";

import React, { Suspense, useState } from "react";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import VerificationInput from "react-verification-input";

import { Button } from "@/components/ui/button";

import Card from "../components/card";
import Description from "../components/description";
import Title from "../components/title";

function Verification() {
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("value: ", value);
    console.log("token: ", token);
  };

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary-light">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary">
            <Mail className="h-5 w-5 text-primary-dark" />
          </div>
        </div>
        <Title>Check your email</Title>
        <Description>We sent a verification link to aziz@gmail.com</Description>
      </div>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <VerificationInput
            value={value}
            onChange={(val) => setValue(val)}
            length={4}
            validChars="0-9"
            autoFocus
            placeholder="0"
            classNames={{
              container: "h-14 sm:h-20 w-fit gap-3",
              character:
                "w-14 sm:w-20 text-3xl sm:text-5xl text-[#A4ACB9] bg-background rounded-lg border-input border-2 font-semibold inline-flex justify-center items-center",
              characterFilled: "!text-foreground",
            }}
          />
          <Button
            variant="default"
            type="submit"
            disabled={value.length < 4}
            className="w-full"
          >
            Verify email
          </Button>
        </form>
      </div>

      <div className="text-center text-base text-customSilver">
        Didn’t receive the email?{" "}
        <Link
          href="#"
          className="font-semibold text-customBlack hover:underline"
        >
          Click to resend
        </Link>
      </div>
    </Card>
  );
}

export default function EmailVerification() {
  return (
    <Suspense>
      <Verification />
    </Suspense>
  );
}
