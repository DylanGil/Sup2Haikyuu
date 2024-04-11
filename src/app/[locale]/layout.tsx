import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/app/[locale]/components/layout/Header";
import { Footer } from "@/app/[locale]/components/layout/Footer";
import { TailwindIndicator } from "@/app/[locale]/components/utils/TailwindIndicator";
import { Toaster } from "./components/ui/toaster";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });
  return {
    title: {
      template: "Sup2Haikyuu | %s ",
      default: t("page-title.home"),
    },
    description: t("page-description.home"),
  };
}

export function generateStaticParams() {
  return ["fr", "en"].map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex h-screen flex-col">
              <Header locale={locale} />
              <div className="grow">
                {children}
                <Toaster />
              </div>
              <Footer />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
