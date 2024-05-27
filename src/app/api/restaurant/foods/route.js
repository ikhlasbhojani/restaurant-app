import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    let success = false
    let payload = await request.json()
    await mongoose.connect(connectionStr)

    const food = new foodSchema(payload)

    let result = await food.save()

    if (result) {
        success = true
    }

    return NextResponse.json({ result, success })
}