const { STATUS_CODES } = require("../constants/response.constants");
const {
  createPost,
  getAllPosts,
  deletePost,
  filterPost,
  likePost,
  commentPost,
  searchPost,
} = require("../services/post.services");
const { setResponse } = require("../utils/response.utils");

const { SUCCESS, CREATED } = STATUS_CODES;

const createPostController = async (req, res, next) => {
  try {
    console.log('req.user', req.user);
    const result = await createPost(req.body, req.user);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "post created successfully",
        result
      );
  } catch (err) {
    next(err);
  }
};

const getAllPostsController = async (req, res, next) => {
  try {
    const result = await getAllPosts();
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "posts retrieved successfully",
        result
      );
  } catch (err) {
    next(err);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const result = await deletePost(req.param.postId, req.user.email);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "post deleted successfully",
        result
      );
  } catch (err) {
    next(err);
  }
};

const filterPostController = async (req, res, next) => {
  try {
    console.log('req.param', req.param)
    const result = await filterPost(req.query.email);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "retrevied for email",
        result
      );
  } catch (err) {
    next(err);
  }
};

const likePostContainer = async (req, res, next) => {
  try {
    const result = await likePost(req.param.postId);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "like updated for the post",
        result
      );
  } catch (err) {
    next(err);
  }
};

const commentPostContainer = async (req, res, next) => {
  try {
    const result = await commentPost(req.param.postId);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "like updated for the post",
        result
      );
  } catch (err) {
    next(err);
  }
};

const searchPostContainer = async (req, res, next) => {
  try {
    const result = await searchPost(req.param.postId);
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        "like updated for the post",
        result
      );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  deletePostController,
  filterPostController,
  likePostContainer,
  commentPostContainer,
  searchPostContainer,
};
