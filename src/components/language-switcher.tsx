import { Check, ChevronsUpDown } from "lucide-react";

import cn from "@/utils/cn";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LanguageIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locales, locale: currentLocale } = useRouter();

  const [open, setOpen] = useState(false);

  function getLocaleName(locale: string) {
    switch (locale) {
      case "en":
        return "English";
      case "fr":
        return "Français";
      case "es":
        return "Español";
      case "de":
        return "Deutsch";
      case "zh":
        return "中文";
      default:
        return "English";
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn(
            "inline-flex h-10 w-fit items-center justify-between gap-2 truncate whitespace-nowrap border-gray-100 p-0 px-3 pl-2.5 text-gray-700 hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-300",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <LanguageIcon className="h-6 w-6 dark:text-gray-500" />
            <div className="h-7 w-0.5 bg-slate-200 dark:bg-gray-700"></div>
            <p className="label-sm font-bold ">
              {getLocaleName(currentLocale || "en")}
            </p>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 rounded-md bg-white p-0 dark:border-2 dark:border-gray-800 dark:bg-gray-900">
        {locales?.map((locale) => (
          <Link key={locale} href="" locale={locale}>
            <DropdownMenuItem
              className={cn(
                "label-sm whitespace-nowrap rounded-none font-medium focus:bg-gray-200 dark:hover:bg-gray-800/50",
                {
                  "text-gray-900": locale === currentLocale,
                  "text-gray-700": locale !== currentLocale,
                }
              )}
            >
              <p className="truncate whitespace-nowrap px-0.5 py-2 font-semibold">
                {getLocaleName(locale)}
              </p>
              <Check
                className={cn(
                  "ml-auto h-5 w-5",
                  locale === currentLocale
                    ? "text-primary-700 opacity-100 dark:text-gray-200"
                    : "opacity-0"
                )}
              />
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
