const express = require("express");
const {
  createPostController,
  getAllPostsController,
  deletePostController,
  likePostContainer,
  commentPostContainer,
  searchPostContainer,
  filterPostController,
} = require("../controllers/post.controllers");
const {
  validateRequiredPayload,
} = require("../middleware/errorHandler.middleware");
const { body, query, param } = require("express-validator");
const router = express.Router();

const postValidation = [
  body("title").notEmpty().withMessage("title is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("attachment").notEmpty().withMessage("attachment is required"),
  body("caption").notEmpty().withMessage("caption is required"),
];

const emailValidation = [
  query("email")
    .notEmpty()
    .withMessage("email is required in query")
]

const postIdValidation = [
  param("postId")
    .notEmpty()
    .withMessage("postId is required in path")
];

/**
 * @swagger
 * /post/:
 *   post:
 *     tags:
 *       - App Routes
 *     summary: createPost
 *     description: create a post route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/posts"
 *     responses:
 *       201:
 *         description: returns all the posts
 *         content:
 *           application/json:
 *             schema:
 *               success:
 *                 type: boolean
 *               error:
 *                 type: boolean
 *               message:
 *                 type: string
 *               data:
 *                 schema:
 *                   $ref: "#/components/schemas/posts"
 *
 */
router.post("/", postValidation, validateRequiredPayload, createPostController);
/**
 * @swagger
 * /post/:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: getAllPosts
 *     description: Basic route to get all posts
 *     responses:
 *       200:
 *         description: returns all the posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/posts"
 */
router.get("/", getAllPostsController);

/**
 * @swagger
 * /post/{postId}:
 *   delete:
 *     tags:
 *       - App Routes
 *     summary: deletePost
 *     description: Basic route to delete post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: post ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns all the posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/posts"
 */
router.delete("/:postId", postIdValidation, validateRequiredPayload, deletePostController);

/**
 * @swagger
 * /post:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: filterPostByEmail
 *     description: Basic route to delete post
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: post ID to update
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: returns all the posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/posts"
 */
router.get("/filter", emailValidation, validateRequiredPayload, filterPostController);
/**
 * @swagger
 * /post/like:
 *   patch:
 *     tags:
 *       - App Routes
 *     summary: likePost
 *     description: Basic route to like post
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         description: post ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: return updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/posts"
 */
router.patch("/like/:postId", likePostContainer);
router.patch("/comment/:postId", commentPostContainer);
router.get("/search", searchPostContainer);

module.exports = router;
