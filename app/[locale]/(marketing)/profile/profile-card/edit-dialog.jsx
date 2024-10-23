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

import { updateProfile } from "@/services/api/profile";

function EditDialog({ profile, setProfile }) {
  const { locale } = useParams();
  const translations = useTranslations(locale);
  const dialogToggle = useToggle();
  const infoTooltip = useToggle();
  const { toast } = useToast();

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
        phoneNumber: z.string().min(5, {
          message: translations.signup?.form?.phone_number?.error_msg,
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
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (profile && !dialogToggle.isOpen) {
      form.reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        JSHIR: profile.JSHIR,
        phoneNumber: profile.phoneNumber,
      });
    }
  }, [profile, dialogToggle.isOpen]);

  const onSubmit = (values) => {
    setLoading(true);

    for (const key in values) {
      values[key] = values[key]?.trim();
    }

    values.JSHIR = Number(values.JSHIR);

    updateProfile(profile.id, values)
      .then(({ data }) => {
        setProfile(data);

        toast({
          title: "Profile has been successfully updated",
        });
        dialogToggle.close();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={dialogToggle.isOpen} onOpenChange={dialogToggle.set}>
      <Button onClick={dialogToggle.open} size="xl">
        {translations.profile.change_info}
      </Button>
      <DialogContent className="max-w-[500px] !rounded-none px-10 py-14">
        <DialogHeader className="!text-center">
          <DialogTitle className="mb-10 text-[32px] font-semibold leading-9">
            {translations.profile.change_info}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.common.first_name}</FormLabel>
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
                  <FormLabel>{translations.common.last_name}</FormLabel>
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
                  <FormLabel>{translations.common.pinfl}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={
                        translations.signup?.form?.pinfl?.placeholder
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.common.phone_number}</FormLabel>
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

export default EditDialog;
