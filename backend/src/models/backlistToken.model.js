const mongoose = require('mongoose');



const blackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token should be required"],
    unique: [true, "token should be unique"]
  }
}, { timestamps: true })

// TTL index
blackListSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const blackListModel = mongoose.model("blacklist", blackListSchema)

module.exports = blackListModel