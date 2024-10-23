"use client";

import React, { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

import useTranslations from "@/hooks/utils/use-translation";

import { sendContact } from "@/services/api/contact";

function PaymeContact({ toggle }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const { locale } = useParams();
  const translations = useTranslations(locale);

  const formSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(3, {
          message: translations.contact_us?.form?.full_name?.error_msg,
        }),
        mail: z.string().min(3, {
          message: translations.contact_us?.form?.email?.error_msg,
        }),
        phoneNumber: z.string().min(5, {
          message: translations.contact_us?.form?.phone_number?.error_msg,
        }),
        message: z.string(),
      }),
    [translations],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      mail: "",
      phoneNumber: "",
      message: "",
      sentFrom: "",
    },
  });

  const onSubmit = (data) => {
    data.sentFrom = pathname;
    sendContact({ data }).then(() => {
      toggle.set(false);
      form.reset();
      toast({
        description: translations.contact_us?.success_text,
        duration: 5000,
      });
    });
  };

  return (
    <AlertDialog
      open={toggle.isOpen}
      onOpenChange={toggle.set}
      className="padding-modal rounded-none"
    >
      <AlertDialogContent className="max-w-[480px] border-0 p-6">
        <h3>{translations.common?.contact_us}</h3>
        <p>{translations.contact_us?.description}</p>

        <Form {...form}>
          <form
            id="payment-contact"
            className="mt-3"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <label className="mb-[6px] block font-semibold text-[#262626] xs:text-left">
              {translations.contact_us?.form?.full_name?.label}
            </label>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={
                        translations.contact_us?.form?.full_name?.placeholder
                      }
                      className="mx-auto mb-3 w-full max-w-[450px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <label className="mb-[6px] block font-semibold text-[#262626] xs:text-left">
              {translations.contact_us?.form?.email?.label}
            </label>
            <FormField
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={
                        translations.contact_us?.form?.email?.placeholder
                      }
                      className="mx-auto mb-3 w-full max-w-[450px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <label className=" mb-[6px] block font-semibold text-[#262626] xs:text-left">
              {translations.contact_us?.form?.phone_number?.label}
            </label>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={
                        translations.contact_us?.form?.phone_number?.placeholder
                      }
                      className="mx-auto mb-3 w-full max-w-[450px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <label className=" mb-[6px] block font-semibold text-[#262626] xs:text-left">
              {translations.contact_us?.form?.message?.label}
            </label>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      type="text"
                      placeholder={
                        translations.contact_us?.form?.message?.placeholder
                      }
                      className="mx-auto mb-3 w-full max-w-[450px] text-[#A3A3A3]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </form>
        </Form>

        <AlertDialogFooter className="modal-flex mt-2 justify-start">
          <AlertDialogCancel className="mt-0 w-full max-w-[210px] rounded-[1000px] text-sm font-semibold text-[#0A0A0A]">
            {translations.common?.cancel}
          </AlertDialogCancel>
          <Button
            type="submit"
            form="payment-contact"
            className="mt-0 w-full  rounded-[1000px] text-sm font-semibold"
          >
            {translations.common?.send_message}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PaymeContact;
