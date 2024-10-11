import { db } from "@/libs/db"

export default async function getListing(){
    try {

        const listing = await db.listing.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
        
        const safeListing = listing.map((listing)=>({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }))
        return safeListing
        
    } catch (error:any) {
        throw new Error(error)
    }
}