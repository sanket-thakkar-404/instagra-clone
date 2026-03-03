const express = require('express');
const postRoute = express.Router();
const protected = require('../middleware/auth.middleware')
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createPostController, getAllPostController, getPostDetailsController, likePostController, savedPostController, deletePostController ,commentPostController,getAllUserPostController} = require('../controller/post.controller')


postRoute.post('/create', protected, upload.single("image"), createPostController)
postRoute.get('/', protected, getAllPostController)
postRoute.post("/details/:postId", protected, getPostDetailsController)
postRoute.delete("/:postId", protected, deletePostController)
postRoute.post("/:postId/like", protected, likePostController)
postRoute.post("/:postId/saved", protected, savedPostController)
postRoute.post("/:postId/comment", protected, commentPostController)
postRoute.get("/user/post" , protected, getAllUserPostController)




module.exports = postRoute