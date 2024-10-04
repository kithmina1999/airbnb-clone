
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { db } from "./libs/db"
import bcrypt from 'bcryptjs'


// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentails");
                }
                // Make sure email is treated as a string
                const email = credentials.email as string;
                const password = credentials.password as string;

                const user = await db.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
                    password,
                    user.hashedPassword
                )
                if(!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }

                return user
            }
        })
    ],
    pages:{
        signIn:'/',
    },
    debug: process.env.NODE_ENV==='development',
    secret:process.env.AUTH_SECRET,
} satisfies NextAuthConfig