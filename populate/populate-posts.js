const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const titles = require("./titles-hun.json");
const blogs = require("./blogs-hun.json");
const PostModel = require("../models/posts.model");
const mongoUrl = process.env.MONGO_ATLAS_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); 
}

const populatePosts = async () => {
    await PostModel.deleteMany({});
  
    const posts = blogs.map((blog, i) => {
      return new PostModel({
            name: titles[i],
            text: blog,
          });
    });
  
  
    await PostModel.create(...posts);
    console.log("Posts created");
  };

const main = async () => {
    await mongoose.connect(mongoUrl);

    await populatePosts();

    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});