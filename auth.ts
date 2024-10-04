import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@auth/prisma-adapter"

import {db }from "@/libs/db"

 

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})