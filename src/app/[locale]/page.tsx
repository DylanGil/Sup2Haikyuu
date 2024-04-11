import { Button } from "@/app/[locale]/components/ui/button";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("server-component");
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-6xl font-bold">{t("welcome")}</h1>
        (This WelcomePage is still in development) <br />
        (You can check other pages)
      </div>
    </main>
  );
}

/* 
'use client'
import { useDictionary } from "./components/utils/dictionary-provider";
const dictionary = useDictionary();

or 

'use server'
import { getDictionary } from "@/get-dictionary";

const dictionary = await getDictionary(lang);
*/
