import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { request } from "http";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import fs from "fs";


// const fs=request('fs')

// const LoadDB = async () => {
//     await connectDB();
// }

// LoadDB();

// to get request to all blogs 
export async function GET(request) {

    await connectDB();
    
    const blogId=request.nextUrl.searchParams.get('id')
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog)
    }
    else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }
}


// post mathod
export async function POST(request) {
    await connectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Handle image
    const image = formData.get("image");
    if (!image || !image.name) {
        return NextResponse.json({ success: false, msg: "Image file missing" }, { status: 400 });
    }
    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imagePath = `./public/${timestamp}_${image.name}`;
    await writeFile(imagePath, imageBuffer);
    const imageUrl = `/${timestamp}_${image.name}`;

    // Handle authorImg
    // const authorImg = formData.get("authorImg");
    // let authorImgUrl = "";
    // if (authorImg && authorImg.name) {
    //     const authorImgBuffer = Buffer.from(await authorImg.arrayBuffer());
    //     const authorImgPath = `./public/${timestamp}_${authorImg.name}`;
    //     await writeFile(authorImgPath, authorImgBuffer);
    //     authorImgUrl = `/${timestamp}_${authorImg.name}`;
    // }


    // Create blogData
    const blogData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        author: formData.get("author"),
        image: imageUrl,
        authorImg: formData.get("authorImg"),
    };

    try {
        const blog = await BlogModel.create(blogData);
        console.log("Blog created successfully:", blog);
        return NextResponse.json({ success: true, msg: "Blog added", data:blog});
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ success: false, msg: "Failed to add blog" }, { status: 500 });
    }
}




// create the delete method
export async function DELETE(request){
    const id=await request.nextUrl.searchParams.get('id');
    const blog=await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"blog deleted"})
}