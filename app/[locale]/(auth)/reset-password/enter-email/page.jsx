"use client";

import React, { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import useTranslations from "@/hooks/utils/use-translation";

import { sendEmail } from "@/services/api/auth";

import Card from "../../components/card";
import Description from "../../components/description";
import Title from "../../components/title";

function EnterEmail() {
  const params = useParams();
  const router = useRouter();
  const translations = useTranslations(params.locale);

  const [loading, setLoading] = useState(false);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({
          message:
            translations.reset_password?.enter_email?.form?.email?.error_msg,
        }),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    sendEmail(values)
      .then(() => {
        router.push(
          `/${params.locale}/reset-password/check-email?email=${values.email}`,
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-full bg-primary-light">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-primary">
            <KeyRound className="h-5 w-5 text-primary-dark" />
          </div>
        </div>
        <Title>{translations.common?.forgot_password}</Title>
        <Description>
          {translations.reset_password?.enter_email?.description}
        </Description>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translations.reset_password?.enter_email?.form?.email?.label}
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={
                      translations.reset_password?.enter_email?.form?.email
                        ?.placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!form.formState.isValid || loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {translations.common?.continue}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default EnterEmail;
