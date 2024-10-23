"use client";

import React, { useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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

import { resetPassword } from "@/services/api/auth";

function NewPasswordForm() {
  const params = useParams();
  const translations = useTranslations(params.locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const code = searchParams.get("code");

  const formSchema = useMemo(
    () =>
      z.object({
        password: z.string().min(6, {
          message:
            translations.reset_password?.new_password?.form?.password
              ?.error_msg,
        }),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    resetPassword({
      password: values.password,
      passwordConfirmation: values.password,
      code,
    })
      .then(() => {
        router.push(`/${params.locale}/reset-password/success`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {
                  translations.reset_password?.new_password?.form?.password
                    ?.label
                }
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={
                    translations.reset_password?.new_password?.form?.password
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
          {translations.reset_password?.new_password?.form?.button_text}
        </Button>
      </form>
    </Form>
  );
}

export default NewPasswordForm;
