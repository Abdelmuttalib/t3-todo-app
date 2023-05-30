import { type ReactNode } from "react";

import cn from "@/utils/cn";

import GradientBackground from "../GradientBackground";
import MainNav from "./MainNav";

interface LayoutProps {
  pageTitle: string | ReactNode;
  children: ReactNode;
  rightSideActions?: ReactNode;
  className?: string;
}

export default function Layout({ children, className }: LayoutProps) {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-[100svh] w-screen bg-[#f8f8f9] antialiased transition-colors duration-300 dark:bg-gray-900">
      <div className="flex w-full flex-col overflow-auto">
        <MainNav />
        <GradientBackground>
          <main
            className={cn("layout w-full px-4 pb-10 pt-6 lg:px-8", className)}
          >
            {children}
          </main>
        </GradientBackground>
      </div>
    </div>
  );
}
