import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersMode";
import { orderSchema } from "@/app/lib/orderModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    let success = false
    let result;
    let payload = await request.json()
    await mongoose.connect(connectionStr)
    const orderObject = await new orderSchema(payload)
    result = await orderObject.save()
    if(result){
        success = true}
    return NextResponse.json({ result, success})
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    let success = false
    await mongoose.connect(connectionStr)
    let result = await orderSchema.find({ user_id: userId });
    if (result) {
        let restoData = await Promise.all(
            result.map(async (item) => {
                let restoInfo = {};
                restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
                restoInfo.deliveryBoyData = await deliveryPartnersSchema.findOne({ _id: item.deliveryBoy_id })
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return restoInfo;
            })
        )
        result = restoData;
        success = true
    }

    return NextResponse.json({ result,success })

}


