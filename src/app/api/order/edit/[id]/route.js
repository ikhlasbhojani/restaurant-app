import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  let success = false;
  let result;

  const payload = await request.json();
  await mongoose.connect(connectionStr);

  result = await orderSchema.updateOne({ deliveryBoy_id: id }, payload);
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
}
