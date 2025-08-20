import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  author: String,
  imagePath: String,
  authorImg: String,
  date:{
    type:Date,
    default:Date.now()
  }
}, { timestamps: true });

const BlogModel = mongoose.models.blog || mongoose.model("blog", BlogSchema);
export default BlogModel;
