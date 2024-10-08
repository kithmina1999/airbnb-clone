import type { Metadata } from "next";
import { Nunito } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/components/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import { auth } from "@/auth";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";

const font = Nunito({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone created by kks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar session={session} currentUser={currentUser} />
        <div className="pb-20 pt-28"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
