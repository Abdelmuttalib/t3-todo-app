import LanguageSwitcher from "../language-switcher";
import Image from "next/image";
import ThemeSwitcher from "../theme-switcher";

export default function MainNav() {
  return (
    <nav className="sticky top-4 z-40 mx-auto w-full max-w-[40rem] flex-none rounded-primary border-2 bg-white/[0.5] py-3 backdrop-blur-md backdrop-filter transition-colors duration-300 dark:border-gray-800/70 dark:bg-gray-900/[0.5] print:hidden lg:pl-0">
      <div className="layout flex h-10 items-center justify-between overflow-y-hidden">
        <div className="flex w-full items-center justify-between gap-3 ">
          <Image
            src="/favicon.ico"
            alt="invix logo"
            width="45"
            height="45"
            className="bg-transparent"
            objectFit="contain"
          />

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
