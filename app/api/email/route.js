

import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/emailModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();

    const formData = await request.formData();
    const emailValue = formData.get('email'); 

    if (!emailValue) {
        return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    const emailData = {
        email: emailValue,
    };

    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email subscribed" });
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