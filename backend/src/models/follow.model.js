const mongoose = require('mongoose');


const followSchema = new mongoose.Schema({
  follower: {
    type: String,
    required: [true, "follower is requires"]
  },
  following: {
    type: String,
    required: [true, "following is requires"]
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  }
}, { timestamps: true })


const FollowModel = mongoose.model("Follow", followSchema)

module.exports = FollowModel;