

import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connectDB();
        const formData = await request.formData();
        const emailValue = formData.get('email');

        if (!emailValue) {
            return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
        }

        await EmailModel.create({ email: emailValue });

        return NextResponse.json({ success: true, msg: "Email subscribed" });
    } catch (err) {
        console.error("POST /api/email error:", err);
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
    }
}

// get find the email get api 
export async function GET(request){
    await connectDB();
    const emails=await EmailModel.find({});
    return NextResponse.json({emails});
}



// delete teh data email Api 
export async function DELETE(request){
    const id= await request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true, msg:"email deleted"})

}