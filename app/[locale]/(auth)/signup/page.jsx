"use client";

import React, { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { register } from "@/services/api/auth";

import Card from "../components/card";
import Description from "../components/description";
import Title from "../components/title";

function Signup() {
  const { locale } = useParams();
  const router = useRouter();
  const translations = useTranslations(locale);
  const infoTooltip = useToggle();
  const [loading, setLoading] = useState(false);

  const formSchema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(3, {
          message: translations.signup?.form?.first_name?.error_msg,
        }),
        lastName: z.string().min(3, {
          message: translations.signup?.form?.last_name?.error_msg,
        }),
        JSHIR: z
          .string()
          .min(14, { message: translations.signup?.form?.pinfl?.error_msg }),
        email: z.string().email({
          message: translations.signup?.form?.email?.error_msg,
        }),
        phoneNumber: z.string().min(5, {
          message: translations.signup?.form?.phone_number?.error_msg,
        }),
        password: z.string().min(6, {
          message: translations.signup?.form?.password?.error_msg,
        }),
        passwordConfirm: z.string().min(6, {
          message: translations.signup?.form?.passwordConfirm?.error_msg,
        }),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      JSHIR: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    values.JSHIR = Number(values.JSHIR);

    register(values)
      .then(() => {
        router.push(`/${locale}/signup/check-email?email=${values.email}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <div className="text-center">
        <Title>{translations.signup?.title}</Title>
        <Description>{translations.signup?.description}</Description>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={
                      translations.signup?.form?.first_name?.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={
                      translations.signup?.form?.last_name?.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="JSHIR"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={translations.signup?.form?.pinfl?.placeholder}
                    endIcon={
                      <TooltipProvider delayDuration={200}>
                        <Tooltip
                          open={infoTooltip.isOpen}
                          onOpenChange={infoTooltip.set}
                        >
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={infoTooltip.toggle}
                              className="flex cursor-pointer items-center justify-center p-1 text-[#A3A3A3]"
                            >
                              <Info className="h-5 w-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm text-white">
                              {translations.signup?.form?.pinfl?.help_text}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={translations.signup?.form?.email?.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={
                      translations.signup?.form?.phone_number?.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      translations.signup?.form?.password?.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <>
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        translations.signup?.form?.passwordConfirm?.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {translations.common?.signup}
          </Button>
        </form>
      </Form>
      <div className="text-center text-base text-customSilver">
        {translations.signup?.login_text}{" "}
        <Link
          href={`/${locale}/login`}
          className="font-semibold text-customBlack hover:underline"
        >
          {translations.common?.login}
        </Link>
      </div>
    </Card>
  );
}

export default Signup;
