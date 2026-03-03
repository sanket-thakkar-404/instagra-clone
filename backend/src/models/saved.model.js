const mongoose = require("mongoose");


const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
}, { timestamps: true })

savedSchema.index({ post: 1, user: 1 }, { unique: true });

const savedModel = mongoose.model("Saved", savedSchema);

module.exports = savedModel