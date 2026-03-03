const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: ""
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})


const postModel = mongoose.model("Post", postSchema)

module.exports = postModel