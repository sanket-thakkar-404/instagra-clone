import { api } from "../../api/api";

export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const registerAPI = async (data) => {
  const res = await api.post("/auth/signup", data)
  return res.data
}
export const logoutAPI = async () => {
  const res = await api.post("/auth/logout")
  return res.data
}
export const checkAuthAPI = async () => {
  const res = await api.get("/auth/check-auth")
  return res.data
}

export const getAllUserAPI = async ()=> {
  const res = await api.get("/auth/")
  return res.data
}

