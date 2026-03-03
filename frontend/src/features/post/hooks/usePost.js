import { useContext } from "react";
import { PostContext } from '../context/postContext'
import { commentPostAPI, createPostAPI, editPostAPI, getAllPostsAPI, getPostsAPI, likePostAPI, postDeleteAPI,allUserPostAPI } from "../services/post.api";



export const usePost = () => {

  const context = useContext(PostContext)
  if (!context) {
    throw new Error("usePost must be used within PostProvider")
  }
  const { posts, setPosts, loading, setLoading, allUserPost, setAllUserPost } = context

  const createPost = async (data) => {
    try {
      setLoading(true)
      const res = await createPostAPI(data)
       setPosts((prev) => [res.post, ...prev]);
      return { success: true }
    } catch (err) {
      console.error("Error in create post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const getPost = async () => {
    try {
      setLoading(true)
      const res = await getPostsAPI()
      setPosts(res.posts)
      return { success: true }
    } catch (err) {
      console.error("Error in getting Post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const getAllPosts = async () => {
    try {
      setLoading(true)
      const res = await getAllPostsAPI()
      setAllUserPost(res.data)
      return { success: true }
    } catch (err) {
      console.error("Error in logout Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const likePost = async (postId) => {
    try {
      setLoading(true)
      const res = await likePostAPI(postId)
    } catch (err) {
      console.error("Error in like post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId) => {
    try {
      setLoading(true)
      const res = await postDeleteAPI(postId)
      return { success: true }
    } catch (err) {
      console.error("Error in like post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const editPost = async (postId, data) => {
    try {
      setLoading(true)
      const res = await editPostAPI(postId, data)
      return { success: true }
    } catch (err) {
      console.error("Error in like post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const commentPost = async (postId , data) => {
    try {
      setLoading(true)
      const res = await commentPostAPI(postId,data)
      return { success: true }
    } catch (err) {
      console.error("Error in like post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const getallUserPost = async () => {
    try {
      setLoading(true)
      const res = await allUserPostAPI()
      setAllUserPost(res.post)
      return { success: true }
    } catch (err) {
      console.error("Error in like post Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return {
    createPost, getAllPosts, getPost, likePost, deletePost, editPost, loading, posts, allUserPost, commentPost,getallUserPost
  }

}