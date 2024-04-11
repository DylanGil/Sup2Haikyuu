"use client";

import { Button } from "@/app/[locale]/components/ui/button";
import { LuMoon, LuSun } from "react-icons/lu";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LuSun className="h-6 w-[1.3rem] dark:hidden" />
      <LuMoon className="hidden size-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
