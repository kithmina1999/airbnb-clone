import type { Metadata } from "next";
import  {Nunito} from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/components/providers/ToasterProvider";

const font = Nunito({
  subsets:['latin'],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone created by kks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
