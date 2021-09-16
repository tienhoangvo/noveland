import { Schema, modelNames, model } from "mongoose";

const blogSchema = new Schema({
  title: String,
  imageCover: String,
  content: Array,
  _author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const BlogModel = modelNames().includes("Blog")
  ? model("Blog")
  : model("Blog", blogSchema);

export default BlogModel;
