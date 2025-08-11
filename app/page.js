'use client'
import Header from "../components/header";
import BlogList from '../components/blogList'
import Footer from '../components/footer'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


export default function Home() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
