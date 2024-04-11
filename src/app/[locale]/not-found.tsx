import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("error");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        {t("404")}
      </h1>
      <p className="text-lg text-center text-gray-500 dark:text-gray-400">
        {t("404description")}
      </p>
    </div>
  );
}
