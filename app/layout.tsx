import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strategy Game",
  description: "Backoffice for a strategy game",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return ( 
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
