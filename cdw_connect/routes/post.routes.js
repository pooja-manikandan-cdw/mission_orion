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
const router = express.Router();

router.post("/", createPostController);
router.get("/", getAllPostsController);
router.delete("/:postId", deletePostController);
router.get("/:email", filterPostController);
router.patch("/like", likePostContainer);
router.patch("/comment", commentPostContainer);
router.patch("/search", searchPostContainer);

module.exports = router;
