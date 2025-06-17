import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = {
  title: "DSA Progress Tracker",
  description: "DSA Progress Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-black w-full h-full antialiased`}
      >
        <StoreProvider>
          <Navbar/>
          {children}
        </StoreProvider>

      </body>
    </html>
  );
}
