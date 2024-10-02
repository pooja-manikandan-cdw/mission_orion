const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  employeeId: String,
  postId: String,
  title: String,
  location: String,
  media: String,
  caption: String,
  timestamp: Timestamp,
  like: Number,
  comments: [
    {
      employeeId: String,
      comment: String,
      timestamp: Timestamp,
    },
  ],
});

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
