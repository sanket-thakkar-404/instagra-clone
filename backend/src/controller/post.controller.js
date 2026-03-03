const getDataUri = require('../config/datauri.config')
const cloudinary = require('../config/cloudinary.config');
const postModel = require('../models/post.model')
const likeModel = require("../models/like.model");
const savedModel = require('../models/saved.model');



module.exports.createPostController = async (req, res) => {
  try {
    const userId = req.user.id
    const caption = req.body?.caption || "";

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }
    const uri = getDataUri(req.file)

    const uploadRes = await cloudinary.uploader.upload(uri, {
      folder: "insta-clone/posts",
      resource_type: "image",
    })

    const post = await postModel.create({
      image: uploadRes.secure_url,
      caption,
      author: userId
    })

    res.status(201).json({
      message: "Post Created Successfully",
      post
    })
  } catch (err) {
    console.error("Error In creating Post", err.message)
    res.status(500).json({ message: "internal Server Error " })
  }
}

module.exports.getAllPostController = async (req, res) => {
  try {
    const userId = req.user.id

    const posts = await postModel.find({ author: userId })

    res.status(200).json({
      message: "All post Fetched Successfully",
      posts,
    })
  } catch (err) {
    console.error("Error in getting All Posts :", err.message)
    res.status(500).json({ message: "Internal Server Error " })
  }

}

module.exports.getPostDetailsController = async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.user.id


    const post = await postModel.findById(postId)

    if (!post) return res.status(404).json({
      message: "Post Not Found"
    })

    const validUser = post.author.toString() == userId

    if (!validUser) return res.status(403).json({
      message: "forbidden content"
    })

    res.status(200).json({
      message: "Post Fetched Successfully",
      post
    })
  } catch (err) {
    console.error("Error In Getting Post Details :", err.message)
    res.status(500).json({
      message: "Internal server Error"
    })
  }

}

module.exports.deletePostController = async (req, res) => {
  try {
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) return res.status(404).json({ message: "Post Not Found" })

    const isValidUser = post.author.toString() === userId

    if (!isValidUser) return res.status(404).json({
      message: "you are not authorized User"
    })

    await postModel.deleteOne({ _id: post._id });
    await likeModel.deleteMany({ post: postId });
    await savedModel.deleteMany({ post: postId });

    res.status(200).json({
      message: "Post Deleted Successfully"
    })

  } catch (err) {
    console.error("Error In deleting Post :", err.message)
    res.status(500).json({ message: "internal Server Error" })
  }
}

module.exports.likePostController = async (req, res) => {
  try {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }


    //  Check if already liked
    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId
    });

    //  If liked → remove like
    if (existingLike) {
      await likeModel.deleteOne({ _id: existingLike._id });

      return res.status(200).json({
        message: "Post unlike",
      });
    }

    await likeModel.create({
      user: userId,
      post: postId
    })

    res.status(201).json({
      message: "Post Liked",
    })
  } catch (err) {
    console.error("Error In getting Like", err.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

module.exports.savedPostController = async (req, res) => {
  try {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }


    //  Check if already saved
    const existingSaved = await savedModel.findOne({
      post: postId,
      user: userId
    });

    //  If liked → remove saved
    if (existingSaved) {
      await savedModel.deleteOne({ _id: existingSaved._id });

      return res.status(200).json({
        message: "Post unsaved",
      });
    }

    await savedModel.create({
      user: userId,
      post: postId
    })

    res.status(201).json({
      message: "Post saved",
    })
  } catch (err) {
    console.error("Error In getting saved", err.message)
    return res.status(500).json({ message: "Internal Server Error" })
  }

}


module.exports.commentPostController = async (req, res) => {

}

module.exports.getAllUserPostController = async (req, res) => {
 try {
    const limit = 10;
    const lastCreatedAt = req.query.lastCreatedAt;

    const query = lastCreatedAt
      ? { createdAt: { $lt: new Date(lastCreatedAt) } }
      : {};

    const posts = await postModel
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("author", "username profileImage")
      .lean();

    res.status(200).json({
      posts,
      hasMore: posts.length === limit
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};