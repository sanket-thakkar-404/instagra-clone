const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is Required"],
    minlength: [3, "username must be at least 3 chars"]
  },
  fullname:{
    type: String,
    default :"guest",
    minlength: [3, "Full Name must be at least 3 chars"]
  },
  email: {
    type: String,
    unique: [true, "Email Id already Exists"],
    required: [true, "Email is Required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "Password should be minimum 6 characters"],
    select: false,
  },
  bio: {
    type: String,
    default :"No bio"
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/s6rqx9267/man.png"
  }
}, { timestamps: true })


const userModel = mongoose.model("User", userSchema)

module.exports = userModel