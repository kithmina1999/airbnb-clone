import getCurrentUser from "@/app/actions/getCurrentUser";
import { db } from "@/libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }
    // Check if currentUser is an object and has an id property
    if (!currentUser || typeof currentUser === 'string' || !currentUser.id) {
        return NextResponse.error();
    }

    const body = await req.json()

    const {
        title,
        description,
        imageSrc,
        category,
        bathroomCount,
        roomCount,
        guestCount,
        location,
        price
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error()
        }
    });

    const listing = await db.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.values,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    })
    return NextResponse.json(listing)
}