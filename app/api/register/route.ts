import { db } from '@/libs/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
export async function POST(
    requset:Request
) {
    const body = await requset.json();
    const{
        email,
        name,
        password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}