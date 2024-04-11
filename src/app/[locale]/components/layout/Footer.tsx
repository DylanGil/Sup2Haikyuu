import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../../public/logo.png";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-border/40 bg-gray-50 dark:bg-background">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 content-center mx-auto">
            <ul className="space-y-2 sm:flex sm:flex-col sm:items-start">
              <li className=" flex items-center space-x-2">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Sup2Haikyuu
                </p>
              </li>
              <li className=" flex items-center space-x-2">
                <MdLocalPhone className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  06 51 61 96 51
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail className="text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  contact@sup2haikyuu.fr
                </span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Anime
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://haikyuu.fandom.com/wiki/Characters"
                    className="hover:underline"
                  >
                    {t("characters")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://haikyuu.fandom.com/wiki/News_Archive"
                    className="hover:underline"
                  >
                    {t("news")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("followus")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/dylan-gil-amaro-64a473211/"
                    className="hover:underline "
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/Xeralya"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
