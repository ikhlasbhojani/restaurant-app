import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import { restaurantSchema } from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, content) {
    const id = content.params.id;
    await mongoose.connect(connectionStr)
    const details = await restaurantSchema.findOne({_id:id })
    const foodItems = await foodSchema.find({resto_id:id })


    return NextResponse.json({ details, foodItems, success: true })

}