import type { ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
}

export default function GradientBackground({
  children,
}: GradientBackgroundProps) {
  return (
    <div className="isolate min-h-screen">
      <div className="absolute inset-x-0 top-[10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[10%]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:right-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
              className="block dark:hidden"
            >
              <stop stopColor="#769ef7" />
              <stop offset="1" stopColor="#769ef7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main>
        <div className="relative px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

{
  /* <div className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="h2 sm:display-sm lg:display-lg bg-gradient-to-br from-primary-400 to-primary-800 bg-clip-text text-transparent">
                {t("app.name")}
              </h1>
              <p className="h2 bg-gradient-to-br from-gray-800 to-primary-800 bg-clip-text text-transparent dark:from-primary-300 dark:to-gray-300">
                {t("app.description")}
              </p>

              <div className="mt-3 flex justify-center gap-3">
                <IconLink
                  href={pathname}
                  locale={locale === "en" ? "zh" : "en"}
                  variant="outline"
                  size="lg"
                >
                  {locale}
                </IconLink>
                <IconButton
                  type="button"
                  variant="outline"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? (
                    <SunIcon className="w-7" />
                  ) : (
                    <MoonIcon className="w-7 p-0.5" />
                  )}
                </IconButton>
              </div>

              <div className="3xl:grid-cols-3 my-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center justify-between rounded-lg border-2 bg-gradient-to-br from-primary-50 to-primary-100 px-5 py-6 text-gray-700 hover:bg-primary-100 hover:to-primary-200 dark:border-gray-800/50 dark:from-gray-900 dark:to-gray-900 dark:text-primary-200 hover:dark:text-primary-400"
                  >
                    <h2 className="h5 first-letter:uppercase">
                      {t(`pages.dashboard.${link.text}.title`)}
                    </h2>
                    <ArrowRightIcon className="w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div> */
}
