import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let query = request.nextUrl.searchParams
    let filter ={};
    if(query.get("location")){
        let city=query.get("location")
        filter = {city:{$regex:city, $options:"i"}}
    }else if (query.get("restaurant")){
        let name=query.get("restaurant")
        filter = {name:{$regex:name, $options:"i"}}
    }
    await mongoose.connect(connectionStr)
    let result = await restaurantSchema.find(filter)
    return NextResponse.json({ success: true , result })
}