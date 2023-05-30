import { MoonIcon, SunMediumIcon } from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <IconButton
      variant="outline"
      size="sm"
      className="inline-flex h-10  items-center justify-center gap-2 border-gray-100  hover:border-gray-200"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <SunMediumIcon className="block w-6 dark:hidden" />
      <MoonIcon className="hidden w-6 dark:block" />
    </IconButton>
  );
}
