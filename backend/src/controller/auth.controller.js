const userModel = require('../models/user.model')
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken')
const getDataUri = require('../config/datauri.config')
const cloudinary = require('../config/cloudinary.config');
const blackListModel = require('../models/backlistToken.model');

// signup route
module.exports.signupController = async (req, res) => {
  try {
    const { username, email, password, bio ,fullname} = req.body

    const existingUser = await userModel.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    })

    if (existingUser) return res.status(409).json({
      message: "user Already Exists" +
        (existingUser.username === username
          ? " username already exists"
          : " email already exists")
    })

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const user = await userModel.create({
      email,
      username,
      password: hash,
      bio,
      fullname,
    })

    const token = generateToken(user._id, user.username);

    res.cookie("JWT_TOKEN", token);

    res.status(201).json({
      message: "user Created Successfully", token, user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        fullname : user.fullname
      }
    })
  } catch (err) {
    console.error("Error in signup routes", err.message);
    res.status(500).json({ message: "internal server Error" })
  }
}
// login route
module.exports.loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    }).select('+password');

    if (!user) return res.status(404).json({
      message: "user not found ",
    })

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) return res.status(401).json({
      message: "invalid Credentials"
    })

    const token = generateToken(user._id, user.username);

    res.cookie("JWT_TOKEN", token, { maxAge: 1 * 24 * 60 * 60 * 1000 });

    res.status(200).json({
      message: "user login Successfully", token, user: {
        id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        fullname : user.fullname
      }
    })
  } catch (err) {
    console.error("Error in login routes", err.message);
    res.status(500).json({ message: "internal server Error" })
  }
}
// logout route
module.exports.logoutController = async (req, res) => {
  try {
    const token = req.cookies.JWT_TOKEN
    res.cookie("JWT_TOKEN", "", { maxAge: 0 });

    await blackListModel.create({
      token,
    })

    res.status(200).json({
      message: "User logout successfully",
    });

  } catch (err) {
    console.error("Error in logout route", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// profile route
module.exports.getProfileController = async (req, res) => {
  try {
    const userId = req.user.id
    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json({ message: "user not found" })

    res.status(200).json({
      message: "User profile fetch successfully",
      user
    });

  } catch (err) {
    console.error("Error in profile route", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// edit profile route
module.exports.editProfileController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) return res.status(401).json({
      message: "unauthorized user"
    })

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const uri = getDataUri(req.file);

    const uploadRes = await cloudinary.uploader.upload(uri, {
      folder: "insta-clone/profile",
      resource_type: "image",
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        profileImage: uploadRes.secure_url,
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile photo updated successfully",
      profileImage: updatedUser.profileImage,
    });

  } catch (err) {
    console.error("Error in editProfileController:", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// checking if user is authorization or not 
module.exports.checkAuthStatus = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({
      message: "user Authorized Not Found"
    })
    const user = await userModel.findById(req.user.id)

    if (!user) return res.status(403).json({
      message: "forbidden User"
    })

    res.status(200).json({
      message: "user are Authorized",
      user
    })
  } catch (err) {
    console.error('Error in checking auth Routes ', err.message);
    res.status(500).json({
      message: "internal server Error"
    })
  }
}

module.exports.getAllUsersController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("username bio profileImage _id email")
      .lean();

    if (!users.length) {
      return res.status(200).json({
        message: "No users found",
        users: []
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      users
    });

  } catch (err) {
    console.error("Error in getAllUsersController", err.message);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};
