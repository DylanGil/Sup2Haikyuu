"use client";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { GrLanguage } from "react-icons/gr";
import { IoMenu, IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import Image from "next/image";
import Logo from "../../../../../public/logo.png";
import Link from "next/link";
import HeaderPageButton from "./HeaderPageButton";

export function Header({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background opacity-95 shadow-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between bg-background p-1">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-foreground lg:hidden"
          >
            <IoMenu className="size-5" />
          </Button>
          <Link href={`/${locale}`}>
            <Image
              src={Logo}
              alt="Logo"
              className="ml-1 h-8 w-auto hover:brightness-125 sm:h-16"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <div className="hidden lg:flex">
            <HeaderPageButton
              href={`/${locale}/tournaments`}
              onClick={() => setIsOpen(false)}
              pageTitle="tournaments"
            />
            <HeaderPageButton
              href={`/${locale}/teams`}
              onClick={() => setIsOpen(false)}
              pageTitle="teams"
            />
            <HeaderPageButton
              href={`/${locale}/players`}
              onClick={() => setIsOpen(false)}
              pageTitle="players"
            />
            <HeaderPageButton
              href={`/${locale}/signin`}
              onClick={() => setIsOpen(false)}
              pageTitle="signin"
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const newPath = window.location.pathname.includes("/fr")
                ? window.location.pathname.replace("/fr", "/en")
                : window.location.pathname.replace("/en", "/fr");
              window.location.href = newPath;
            }}
          >
            <GrLanguage className="size-5" />
          </Button>
          <ThemeToggle />
        </div>
      </nav>
      {isOpen && (
        <div className="fixed top-0 w-full bg-background">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between p-3">
              <Link href={`/${locale}`}>
                <Image
                  src={Logo}
                  alt="Logo"
                  className="ml-10 w-auto h-10"
                  onClick={() => setIsOpen(false)}
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                className="mr-3 rounded-lg p-2 text-foreground"
              >
                <IoClose size={20} />
              </Button>
            </div>
            <div className="pt-2 text-center text-lg">
              <HeaderPageButton
                href={`/${locale}/pricing`}
                onClick={() => setIsOpen(false)}
                pageTitle="pricing"
                mobile
              />
              <HeaderPageButton
                href={`/${locale}/signin`}
                onClick={() => setIsOpen(false)}
                pageTitle="signin"
              />
              <HeaderPageButton
                href={`/${locale}/signup`}
                onClick={() => setIsOpen(false)}
                pageTitle="signup"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
