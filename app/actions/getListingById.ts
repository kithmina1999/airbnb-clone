import { db } from "@/libs/db";

interface IParams {
    listingId?: string
}

export default async function getListingById(params: IParams) {
    try {
        const { listingId } = params

        const listing = await db.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        })
        if(!listing) {
            return null
        }
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch (error) {
        throw new Error(error as string)
    }
}