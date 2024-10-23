"use client";

import React, { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Loader2 } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

import useToggle from "@/hooks/utils/use-toggle";
import useTranslations from "@/hooks/utils/use-translation";

import { changePassword } from "@/services/api/auth";
import { updateProfile } from "@/services/api/profile";

function EditPassword({ profile, setProfile }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const dialogToggle = useToggle();
  const infoTooltip = useToggle();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const formSchema = useMemo(
    () =>
      z.object({
        password: z.string().min(6, {
          message: translations.signup?.form?.password?.error_msg,
        }),
        currentPassword: z.string().min(6, {
          message: translations.signup?.form?.password?.error_msg,
        }),
        passwordConfirmation: z.string().min(6, {
          message: translations.signup?.form?.password?.error_msg,
        }),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      currentPassword: "",
      passwordConfirmation: "",
    },
  });

  useEffect(() => {
    if (profile && !dialogToggle.isOpen) {
      form.reset({});
    }
  }, [profile, dialogToggle.isOpen]);

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    changePassword(values)
      .then(({ data }) => {
        setProfile(data);

        toast({
          title: translations.profile.update_pass,
        });
        dialogToggle.close();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={dialogToggle.isOpen} onOpenChange={dialogToggle.set}>
      <Button onClick={dialogToggle.open} size="xl" variant="outline">
        {translations.profile.change_pass}
      </Button>
      <DialogContent className="max-w-[500px] !rounded-none px-10 py-14">
        <DialogHeader className="!text-center">
          <DialogTitle className="mb-10 text-[32px] font-semibold leading-9">
            {translations.profile.change_pass}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.profile.current_pass}</FormLabel>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.profile.new_pass}</FormLabel>
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.profile.confirm_pass}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        translations.signup?.form?.password?.placeholder
                      }
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
      </DialogContent>
    </Dialog>
  );
}

export default EditPassword;
