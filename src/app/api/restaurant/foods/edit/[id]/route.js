import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"


export async function GET(request, content) {
let success = false
const id = content.params.id

await mongoose.connect(connectionStr)
const result = await foodSchema.findOne({_id: id})
if (result) {
    success = true
}else{
    success = false
}
return NextResponse.json({ result, success })
    
}

export async function PUT(request, content) {
    let success = false
    const id = content.params.id
    const payload = await request.json()
    await mongoose.connect(connectionStr)
    const result = await foodSchema.updateOne({_id: id}, payload)
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}