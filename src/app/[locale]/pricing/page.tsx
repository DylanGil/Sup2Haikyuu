"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { IoArrowForward } from "react-icons/io5";
import { useState } from "react";
import { Loader2, Info, CircleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useToast } from "../components/ui/use-toast";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("pricing");
  const tTitle = useTranslations("page-title");
  const { toast } = useToast();

  const formSchema = z.object({
    firstName: z.string().min(1, {
      message: t("errorFirstname"),
    }),
    lastName: z.string().min(1, {
      message: t("errorLastname"),
    }),
    email: z.string().email({
      message: t("errorEmail"),
    }),
    phone: z.string().min(1, {
      message: t("errorPhone"),
    }),
    message: z.string().min(1, {
      message: t("errorMessage"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { status } = await response.json();
      if (status === 200) {
        toast({
          description: t("apiSuccess"),
          duration: 5000,
        });
        <Alert>
          <Info className="mr-2 size-4" />
          <AlertTitle>{t("apiSuccess")}</AlertTitle>
          <AlertDescription>{t("apiSuccess")}</AlertDescription>
        </Alert>;
      } else {
        toast({
          variant: "destructive",
          description: t("apiError"),
          duration: 3000,
        });
        <Alert variant="destructive">
          <CircleAlert className="mr-2 size-4" />
          <AlertTitle>{t("apiError")}</AlertTitle>
          <AlertDescription>{t("apiError")}</AlertDescription>
        </Alert>;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-between px-3 py-24 sm:p-24">
      <div className="flex w-[85%] flex-col items-center justify-center sm:w-full lg:w-[85%] ">
        <div className="pb-10 sm:w-3/6">
          <h1 className="text-4xl font-bold">{tTitle("pricing")}</h1>
          <p className="text-sm ">{t("firstParagraph")}</p>
          <br />
          <p className="text-start text-sm ">{t("secondParagraph")}</p>
          <p className="text-start text-sm font-semibold ">
            {t("thirdParagraph")}
          </p>
        </div>

        <div className="rounded-xl border px-3 py-10 sm:px-28 lg:w-4/6">
          <div className="pb-10">
            <h2 className="text-center text-2xl font-bold">
              {t("contactTitle")}
            </h2>
            <p className="text-center text-sm">{t("contactSubtitle")}</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contactLastname")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contactFirstname")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
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
                    <FormLabel>{t("contactEmail")}</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contactPhone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+33601234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message:</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("contactMessage")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                {isLoading ? (
                  <Button disabled type="submit">
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t("contactSend")} <IoArrowForward />
                  </Button>
                ) : (
                  <Button type="submit">
                    {t("contactSend")} <IoArrowForward />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
