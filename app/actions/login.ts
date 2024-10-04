'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

interface LogInProps {
    email?: string;
    password?: string;
}

export const logIn = async ({ email,password }: LogInProps) => {

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })
        return { success: "logged in" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }

}