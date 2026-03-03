const mongoose = require('mongoose')


const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "post id Is required"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user id Is required"]
  }
}, { timestamps: true })

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("Likes", likeSchema)

module.exports = likeModel