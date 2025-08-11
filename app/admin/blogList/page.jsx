"use client"

import BlogTableItem from "@/components/adminComponents/blogTableItem";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Page = () => {
    const [blogs, setBlogs] = useState([])

    const FetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs)
    }

    const deleteblog=async(mongoId)=>{
        const response=await axios.delete('/api/blog',{
            params:{
                id:mongoId
            }
        })
        toast.success(response.data.msg);
        FetchBlogs()
    }



    useEffect(() => {
        FetchBlogs();
    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1>All blogs</h1>
            <div className="relative h-[80vh] max-w-[850px] overflow-x auto mt-4 border border-gray-400 scrollbar-hide"></div>
            <table className="text-sm text-gray-700 text-left uppercase">
                <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="hidden sm:block px-6 py-3">
                            Auther name
                        </th>
                        <th scope="col" className=" px-6 py-3">
                            Blog title
                        </th>
                        <th scope="col" className=" px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className=" px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((item, index) => {
                        return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlog={deleteblog} />
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Page;