const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

// follow routes
module.exports.followUserController = async (req, res) => {
  try {

    const followingUsername = req.params.username
    const followerUsername = req.user.username

    if (followingUsername == followerUsername) return res.status(400).json({
      message: "you can't follow yourself"
    })

    const userToFollow = await userModel.findOne({ username: followingUsername })
    if (!userToFollow) return res.status(404).json({
      message: "user Not Found"
    })

    const existingFollow = await followModel.findOne({
      follower: followerUsername,
      following: followingUsername
    })

    if (existingFollow) return res.status(200).json({
      message: "you already Follow this account"
    })

    const followRecord = await followModel.create({
      follower: followerUsername,
      following: followingUsername
    })

    res.status(200).json({
      message: `you are now following ${followingUsername} successfully`,
      followRecord
    })
  } catch (err) {
    console.error("Error in Follow route : ", err.message)
    res.status(500).json({ message: "internal server Error" })
  }

};
// unfollow routes
module.exports.unfollowUserController = async (req, res) => {
  try {

    const followingUsername = req.params.username
    const followerUsername = req.user.username


    const userToUnFollow = await userModel.findOne({ username: followingUsername })
    if (!userToUnFollow) return res.status(404).json({
      message: "user Not Found"
    })

    const deletedFollow = await followModel.findOneAndDelete({
      follower: followerUsername,
      following: followingUsername
    })

    if (!deletedFollow) {
      return res.status(400).json({
        message: `You are not following ${followingUsername}this user`
      });
    }

    res.status(200).json({
      message: `you are now unfollow ${followingUsername} successfully`,
    })
  } catch (err) {
    console.error("Error in unFollow route : ", err.message)
    res.status(500).json({ message: "internal server Error" })
  }

};
// get all the follow requested
module.exports.getFollowRequestsController = async (req, res) => {
  try {

    const user = req.user.username

    const requests = await followModel.find({
      following: user,
      status: "pending"
    })

    res.status(200).json({
      total: requests.length,
      requests
    });

  } catch (err) {
    console.error("Error fetching follow requests:", err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
// accept follow
module.exports.acceptFollowRequestController = async (req, res) => {
  try {

    const followerUsername = req.params.username;   // person who sent request
    const currentUsername = req.user.username;         // person accepting

    const followRequest = await followModel.findOne({
      follower: followerUsername,
      following: currentUsername,
      status: "pending"
    });

    if (!followRequest) {
      return res.status(404).json({
        message: "Follow request not found"
      });
    }

    followRequest.status = "accepted";
    await followRequest.save();

    res.status(200).json({
      message: "Follow request accepted successfully"
    });

  } catch (err) {
    console.error("Error accepting follow request:", err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};