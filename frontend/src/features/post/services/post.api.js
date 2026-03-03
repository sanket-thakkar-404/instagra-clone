import { api } from "../../api/api";

export const createPostAPI = async (data) => {
  const res = await api.post("/posts/create", data)
  return res.data
}
export const getPostsAPI = async () => {
  const res = await api.get("/posts/")
  return res.data
}
export const getAllPostsAPI = async () => {
  const res = await api.get("/posts/")
  return res.data
}
export const likePostAPI = async (postId) => {
  const res = await api.post(`${postId}/like`)
  return res.data
}
export const postDeleteAPI = async (postId) => {
  const res = await api.post(`posts/${postId}`)
  return res.data
}
export const editPostAPI = async (postId, data) => {
  const res = await api.get(`posts/${postId}/edit`, data)
  return res.data
}
export const commentPostAPI = async (postId, data) => {
  const res = await api.get(`posts/${postId}/comment`, data)
  return res.data
}
export const savedPostAPI = async (postId) => {
  const res = await api.get(`posts/${postId}/saved`)
  return res.data
}
export const allUserPostAPI = async () => {
  const res = await api.get(`/posts/user/post`)
  return res.data
}

