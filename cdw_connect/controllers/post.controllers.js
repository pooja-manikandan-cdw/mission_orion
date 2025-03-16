const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
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
const {
  SUCCESS_POST_CREATED,
  SUCCESS_POSTS_FETCHED,
  POST_DELETED_SUCCESS,
  FILTERED_POST_SUCCESS,
  UPDATED_COMMENT,
  UPDATED_LIKE,
  SEARCH_POSTS_SUCCESS,
} = MESSAGES.SUCCESS.POSTS;

/**
 * @description controller to initate create post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const createPostController = async (req, res, next) => {
  try {
    const result = await createPost(req.body, req.employee);
    if (result)
      setResponse(res, CREATED, true, false, SUCCESS_POST_CREATED, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate get all post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const getAllPostsController = async (req, res, next) => {
  try {
    const result = await getAllPosts();
    if (result)
      setResponse(res, SUCCESS, true, false, SUCCESS_POSTS_FETCHED, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate delete post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const deletePostController = async (req, res, next) => {
  try {
    const result = await deletePost(req.params.postId, req.employee.email);
    if (result)
      setResponse(res, SUCCESS, true, false, POST_DELETED_SUCCESS, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate filter post based on email service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const filterPostController = async (req, res, next) => {
  try {
    const result = await filterPost(req.query.email);
    if (result)
      setResponse(res, SUCCESS, true, false, FILTERED_POST_SUCCESS, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate like post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const likePostContainer = async (req, res, next) => {
  try {
    const result = await likePost(req.params.postId, req.employee.email);
    if (result) setResponse(res, SUCCESS, true, false, UPDATED_LIKE, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate comment post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const commentPostContainer = async (req, res, next) => {
  try {
    const result = await commentPost(
      req.params.postId,
      req.employee.email,
      req.body.comment
    );
    if (result) setResponse(res, SUCCESS, true, false, UPDATED_COMMENT, result);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate search post service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const searchPostContainer = async (req, res, next) => {
  try {
    const result = await searchPost(req.query);
    if (result)
      setResponse(res, SUCCESS, true, false, SEARCH_POSTS_SUCCESS, result);
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
