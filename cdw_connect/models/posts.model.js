const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: String,
  postId: String,
  title: String,
  location: String,
  media: String,
  caption: String,
  timestamp: { type: Date, default: Date.now },
  like: {
    count: Number,
    users: [String],
  },
  comments: [
    {
      employeeId: String,
      comment: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
