import { db } from "@/libs/db"

export default async function getListing(){
    try {

        const listing = await db.listing.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        return listing
        
    } catch (error:any) {
        throw new Error(error)
    }
}