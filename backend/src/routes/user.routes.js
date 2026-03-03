const express = require('express');
const protect = require('../middleware/auth.middleware');
const userRoutes = express.Router()
const { followUserController, unfollowUserController, getFollowRequestsController, acceptFollowRequestController } = require("../controller/user.controller")



userRoutes.post("/follow/:username", protect, followUserController)
userRoutes.post("/unfollow/:username", protect, unfollowUserController)
userRoutes.get("/follow-requests", protect, getFollowRequestsController)
userRoutes.post("/follow-requests/accept/:username", protect, acceptFollowRequestController)


module.exports = userRoutes