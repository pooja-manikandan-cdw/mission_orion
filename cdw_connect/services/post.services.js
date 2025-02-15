const moment = require("moment");
const AppError = require("../AppError");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const posts = require("../models/posts.model");

const { BAD_REQUEST } = STATUS_CODES;
const { UNABLE_TO_CREATE_POST, UNABLE_TO_DELETE_POST, UNABLE_TO_FIND_POST } =
  MESSAGES.FAILURE;

const createPost = async (post, user) => {
  const {email} = user
  const newPost = new posts({...post, email});
  const createdStatus = newPost.save();
  if (createdStatus) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_CREATE_POST, "");
};

const getAllPosts = async () => {
  const post = await posts.find();
  return post;
};

const deletePost = async (postId, email) => {
  const deletedStatus = await posts.deleteOne({
    postId: postId,
    email: email,
  });
  if (deletedStatus.deletedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_DELETE_POST, "");
};

const filterPost = async (email) => {
  console.log('email', email)
  const post = await posts.find({email: email});
  return post;
};

const likePost = async (postId, employeeId) => {
  const updatedResult = await users.updateOne({ postId: postId, "like.users": { $ne: employeeId } },
    {
      $inc: { "like.count": 1 },  
      $addToSet: { "like.users": employeeId }  
    });
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
};

const commentPost = async (employeeId, postId, comment) => {
  const updatedResult = await users.updateOne({ postId: postId }, {
    $push: {
      comments: {
        employeeId: employeeId,
        comment: comment,
        timestamp: Date.now()
      }
    }
  });
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_POST, "");
};

const searchPost = async (query) => {
  const { username, designation, title, location, caption } = query;
  const results = await posts.find([{
    $lookup: {
      from: 'email',               
      localField: 'email',         
      foreignField: '_id',
      as: 'userDetails',
    }
  },
  {
    $unwind: '$userDetails',
  },
  {
    $match: {
      'userDetails.name': username,
      title: title,
      location: location,
      caption: caption,
    }
  }])
  console.log('results', results);
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
