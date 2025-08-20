'use client'

import { assets } from "@/Assets/assets";
import React, { useState, useEffect } from "react";
import { use } from "react";  // ← Import use hook from React
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";
import axios from "axios";
import AuthorImg from '../../../Assets/profile_icon.png'

const Blog = ({ params: paramsPromise }) => {
    const params = use(paramsPromise); // ← Unwrap the Promise here
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id  //  Corrected ID usage
                }
            });
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch blog:", error);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []);

    return data ? (
        <>
            <div className="bg-gray-200 py-5 px-5 md:px-12 ig:px-28">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image src={assets.logo} width={70} alt="Logo" className="w-[130px] sm:w-auto" />
                    </Link>
                    <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                        Get Start
                        <Image src={assets.arrow} alt="Arrow" />
                    </button>
                </div>

                <div className="text-center my-24">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>

                    {/*  Safe conditional image rendering */}
                    {/* {data.authorImg ? (
                        <Image
                            className="mx-auto mt-6 border-white rounded-full"
                            src={data.authorImg}
                            width={60}
                            height={60}
                            alt="Author"
                        />
                    ) : null} */}

                    <Image className="mx-auto mt-6 border-white rounded-full" src={AuthorImg} alt="autor" width={60} height={60}/>

                    <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">{data.author}</p>
                </div>
            </div>

            <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
                {/*  Safely render blog image */}
                {data.image && (
                    <Image
                        className="border-4 border-white"
                        src={data.image}
                        width={1280}
                        height={720}
                        alt="Blog Cover"
                    />
                )}
                <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

                </div>

                <div className="my-24">
                    <p className="text-black font-semibold my-4">Share this article on social media</p>
                    <div className="flex gap-4">
                        <Image src={assets.facebook_icon} width={50} alt="Facebook" />
                        <Image src={assets.twitter_icon} width={50} alt="Twitter" />
                        <Image src={assets.googleplus_icon} width={50} alt="Google Plus" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    ) : null;
};
export default Blog;
