const moment = require("moment");
const AppError = require("../AppError");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const posts = require("../models/posts.model");

const { BAD_REQUEST } = STATUS_CODES;
const { UNABLE_TO_CREATE_POST, UNABLE_TO_DELETE_POST, UNABLE_TO_FIND_POST } =
  MESSAGES.FAILURE;

/**
 * @description creates a post in the logged user email
 * @param {Object} post post details to be created
 * @param {Object} user logged in user detials
 * @returns boolean based on post creation
 */
const createPost = async (post, user) => {
  const { email } = user;
  const newPost = new posts({ ...post, email });
  const createdStatus = newPost.save();
  if (createdStatus) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_CREATE_POST, "");
};

/**
 * @description get all posts
 * @returns retrived posts
 */
const getAllPosts = async () => {
  const post = await posts.find();
  return post;
};

/**
 * @description allows logged in user to delete their post
 * @param {String} postId post id of the corresonding post to be deleted
 * @param {String} email email of logged in employee
 * @returns boolean based on deletion status
 */
const deletePost = async (postId, email) => {
  const deletedStatus = await posts.deleteOne({
    _id: postId,
    email: email,
  });
  if (deletedStatus.deletedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_DELETE_POST, "");
};

/**
 * @description returns posts filtered based on email
 * @param {Object} email email of the logged in employee
 * @returns retrieved posts for the email
 */
const filterPost = async (email) => {
  const post = await posts.find({ email: email });
  return post;
};

/**
 * @description update like for post with the corresponding email
 * @param {String} postId post id of the corresonding post
 * @param {String} email email of logged in employee
 * @returns boolean based on update status
 */
const likePost = async (postId, employeeId) => {
  const post = await posts.findOne({ _id: postId });
  if (!post) {
    throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
  }

  if (post.like.users.includes(employeeId)) {
    throw new AppError(BAD_REQUEST, "You have already liked this post", "");
  }

  const updatedResult = await posts.updateOne(
    { _id: postId },
    {
      $inc: { "like.count": 1 },
      $addToSet: { "like.users": employeeId },
    }
  );
  if (updatedResult.modifiedCount) {
    return true;
  } else if (!updatedResult.matchedCount) {
    throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
  } else {
    throw new AppError(BAD_REQUEST, "You have already liked this post", "");
  }
};

/**
 * @description update comment for the post with the corresponding email
 * @param {String} postId post id of the corresponding post
 * @param {String} email email of the logged in employee
 * @param {String} comment comment to be updated for the post
 * @returns boolean based on update status
 */
const commentPost = async (postId, email, comment) => {
  const updatedResult = await posts.updateOne(
    { _id: postId },
    {
      $push: {
        comments: {
          email: email.toString(),
          comment: comment,
          timestamp: Date.now(),
        },
      },
    }
  );
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
};

/**
 * @description search posts based on the given query params
 * @param {Object} query query param based on which search posts
 */
const searchPost = async (query) => {
  const matchStage = {
    "userDetails.name": query.username || "",
    "userDetails.designation": query.designation || "",
    title: query.title || "",
    location: query.location || "",
    caption: query.caption || "",
  };
  const results = await posts.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "email",
        foreignField: "email",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
    {
      $match: matchStage,
    },
    {
      $project: {
        userDetails: 0,
      },
    },
  ]);

  return results;
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  likePost,
  commentPost,
  searchPost,
  filterPost,
};
