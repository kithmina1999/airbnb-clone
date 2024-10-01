import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import {db }from "@/libs/db"
import { DiBlackberry } from "react-icons/di"
 

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})