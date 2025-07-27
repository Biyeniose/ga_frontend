import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  Source_Code_Pro, //
  Ubuntu,
  Inter, //
  IBM_Plex_Mono, // // //
  Fira_Code,

  //Rubik,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: "500",
});

const montserrat = IBM_Plex_Mono({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: "600",
});

const openSans = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
  weight: "400",
});

const lato = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: "300",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Goal Archive",
  description: "Sports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${openSans.variable} ${lato.variable} ${ubuntu.variable} ${sourceCodePro.variable} ${roboto.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
