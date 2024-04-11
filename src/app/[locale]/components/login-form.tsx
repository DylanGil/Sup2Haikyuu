"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { IoArrowForward } from "react-icons/io5";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("signin");
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email({
      message: t("errorEmail"),
    }),
    password: z.string().min(1, {
      message: t("errorPassword"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <div className="rounded-xl border px-2 py-10 sm:px-16 lg:w-4/6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
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
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">
            {isLoading ? (
              <Button disabled type="submit">
                <Loader2 className="mr-2 size-4 animate-spin" />
                {t("submit")} <IoArrowForward />
              </Button>
            ) : (
              <Button type="submit">
                {t("submit")} <IoArrowForward />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
