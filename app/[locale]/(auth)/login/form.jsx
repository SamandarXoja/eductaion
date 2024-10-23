"use client";

import React, { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
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
import { useToast } from "@/components/ui/use-toast";

import { useStorageState } from "@/hooks/utils/use-storage-state";
import useTranslations from "@/hooks/utils/use-translation";

import { login, loginWithSso, ssoRequest } from "@/services/api/auth";

function LoginForm() {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSSO = searchParams.get("sso");
  const [profile, setProfile] = useState();
  const SAMLRequest = searchParams.get("SAMLRequest");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useStorageState("token");
  const [user, setUser] = useStorageState("user");
  const [data, setData] = useState("");
  const { toast } = useToast();

  const formSchema = useMemo(
    () =>
      z.object({
        identifier: z.string().email({
          message: translations.login?.form?.identifier?.error_msg,
        }),
        password: z.string().min(6, {
          message: translations.login?.form?.password?.error_msg,
        }),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== "undefined") {
      setProfile(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  useEffect(() => {
    if (isSSO && SAMLRequest && profile) {
      loginWithSso({ mail: profile.email }).then(({ data }) => {
        setData(data);
      });
    } else if (profile) {
      router.push(`/${locale}`);
    }
  }, [isSSO, SAMLRequest, profile, router, locale]);

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    login(values)
      .then(({ data }) => {
        setToken(data?.jwt);
        setUser(data?.user);
        if (isSSO && SAMLRequest) {
          loginWithSso({ mail: data?.user?.email }).then(({ data }) => {
            setData(data);
          });
        } else {
          router.push(`/${locale}/profile`);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {!data ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={
                        translations.login?.form?.identifier?.placeholder
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
                        translations.login?.form?.password?.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href={`/${locale}/reset-password/enter-email`}
              className="!mb-2 !mt-5 inline-block font-medium text-customBlue hover:underline"
            >
              {translations.common?.forgot_password}
            </Link>
            <Button type="submit" disabled={loading} className="w-full">
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {translations.common?.login}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center">
            {translations.login?.coursera_form?.title}
          </h1>
          <form
            method="post"
            action="https://www.coursera.org/api/samlLogin.v1/login"
          >
            <input
              type="hidden"
              name="SAMLResponse"
              value={data.SAMLResponse}
            />
            <Button type="submit" className="w-full">
              <input
                type="submit"
                value={translations.common?.submit}
                className="cursor-pointer "
              />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
