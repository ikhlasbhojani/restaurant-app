import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    await mongoose.connect(connectionStr);
    const data = await userSchema.find();
    return NextResponse.json({ result: data });
}

export async function POST(request) {

    let payload = await request.json()
    await mongoose.connect(connectionStr)
    let result;
    let success = false
    if (payload.login) {
        result = await userSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true
        }
    } else {
        const data = new userSchema(payload)
        result = await data.save()
        if (result) {
            success = true
        }
    }

    
    return NextResponse.json({result,success})

}