import { Check, ChevronsUpDown } from "lucide-react";

import cn from "@/utils/cn";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
            "inline-flex h-10 w-28 items-center justify-between gap-2 truncate whitespace-nowrap border-gray-100 p-0 px-4 pl-2.5 text-gray-700 hover:border-gray-200 dark:border-gray-800 dark:bg-gray-800/40 dark:text-gray-300",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <LanguageIcon className="h-6 w-6 dark:text-gray-500" />
            <div className="h-7 w-0.5 bg-slate-200 dark:bg-gray-700"></div>
            <p className="label-md font-bold uppercase">{currentLocale}</p>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-8 rounded-lg bg-white dark:border-2 dark:border-gray-800 dark:bg-gray-900">
        <DropdownMenuSeparator />
        {locales?.map((locale) => (
          <Link key={locale} href="" locale={locale}>
            <DropdownMenuItem className="whitespace-nowrap py-2 font-medium focus:bg-gray-200 dark:hover:bg-gray-800/50">
              <p className="label-sm truncate whitespace-nowrap rounded-primary">
                {locale}
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
