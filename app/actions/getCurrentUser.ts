import { db } from "@/libs/db";
import { auth } from "@/auth";
import toast from "react-hot-toast";



async function getCurrentUser() {
    try {
        const session = await auth()
        if (!session) {
            return null
        }
        const email = session.user?.email as string
        const currentUser = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if (!currentUser) {
            return null
        }
        return currentUser

    } catch (error) {
        return toast.error("something went wrong"+error)
    }
}

export default getCurrentUser