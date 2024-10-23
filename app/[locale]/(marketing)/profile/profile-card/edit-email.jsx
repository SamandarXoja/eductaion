"use client";

import React, { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2, PenBox } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { sendEmailConfirmation } from "@/services/api/auth";
import { updateProfile } from "@/services/api/profile";

function EditEmail({ profile, setProfile }) {
  const { locale } = useParams();

  const translations = useTranslations(locale);
  const dialogToggle = useToggle();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isSend, setSend] = useState(false);
  const [timerCount, setTimerCount] = useState(3);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(3, {
          message: translations.signup?.form?.first_name?.email,
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

  useEffect(() => {
    if (profile && !dialogToggle.isOpen) {
      form.reset({
        email: profile.email,
      });
    }
  }, [profile, dialogToggle.isOpen]);

  const onSubmit = (values) => {
    setLoading(true);
    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    values.confirmed = false;

    if (values.email !== profile.email) {
      updateProfile(profile.id, values).then(({ data }) => {
        setProfile(data);
        sendEmailConfirmation(values).then((data) => {
          const timer = setInterval(() => {
            setTimerCount((prev) => prev - 1);
          }, 1000);

          setTimeout(() => {
            clearInterval(timer);
            localStorage.clear();
            dialogToggle.close();
            location.href = "/";
          }, 3000);
          setSend(true);
        });
      });
    } else {
      toast({ title: translations.profile.same_email });
    }
  };

  return (
    <Dialog open={dialogToggle.isOpen} onOpenChange={dialogToggle.set}>
      <PenBox
        onClick={dialogToggle.open}
        size={18}
        className="flex-shrink-0 cursor-pointer"
      />

      <DialogContent className="max-w-[500px] !rounded-none px-10 py-14">
        <DialogHeader className="!text-center">
          <DialogTitle className="text-[32px] font-semibold leading-9">
            {isSend
              ? translations.profile.sent_email
              : translations.profile.change_email}
          </DialogTitle>
        </DialogHeader>
        {isSend ? (
          <div>
            <h1 className="text-center text-[48px]">{timerCount}</h1>
            <p className="text-center"> {translations.profile.log_out}</p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 space-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{"Email"}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={
                          translations.signup?.form?.email?.placeholder
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="rounded-full"
                >
                  {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  {translations.common.submit}
                </Button>
                <Button
                  type="button"
                  onClick={dialogToggle.close}
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                >
                  {translations.common.cancel}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditEmail;
