const moment = require("moment");
const AppError = require("../AppError");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const posts = require("../models/posts.model");

const { BAD_REQUEST } = STATUS_CODES;
const { UNABLE_TO_CREATE_POST, UNABLE_TO_DELETE_POST, UNABLE_TO_FIND_POST } =
  MESSAGES.FAILURE;

const createPost = async (post) => {
  const newPost = new posts(post);
  const createdStatus = newPost.save();
  if (createdStatus) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_CREATE_POST, "");
};

const deletePost = async (postId, loggedIdUserId) => {
  const deletedStatus = await posts.deleteOne({
    postId: postId,
    employeeId: loggedIdUserId,
  });
  if (deletedStatus.deletedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_DELETE_POST, "");
};

const likePost = async (postId) => {
  const updatedResult = await users.updateOne({ postId: postId }, { like: 10 });
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
};

const commentPost = async (userId, postId, comment) => {
  const post = await posts.findOne({ postId: postId });

  post.comments.push({
    userId: userId,
    comment: comment,
    timestamp: moment().format(),
  });
  const updatedResult = await users.updateOne({ postId: postId }, post);
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
};

const searchPost = async (query) => {
  const {username, designation, title, location, caption} = query;
  
};

module.exports = { createPost, deletePost, likePost, commentPost, searchPost };
