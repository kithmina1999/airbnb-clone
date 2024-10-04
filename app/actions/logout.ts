'use server'

import { signOut } from "next-auth/react";





export const logOut = async () => {

    try {
        await signOut({})
    } catch (error) {
        throw error;
    }

}