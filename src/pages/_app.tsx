import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider defaultTheme='system' attribute='class' storageKey='theme'>
      <Toaster
        position="top-right"
        richColors
        expand
        visibleToasts={6}
        closeButton
        style={{
          marginRight: "1.5rem",
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
