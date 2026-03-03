import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'
import { loginAPI, registerAPI, logoutAPI, checkAuthAPI ,getAllUserAPI} from "../services/auth.api";



export const useAuth = () => {

  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  const { user, setUser, loading, setLoading, allUser, setAllUser,isCheckingUsers , setIsCheckingUsers } = context

  const handleLogin = async (data) => {
    try {
      setLoading(true)
      const res = await loginAPI(data)
      setUser(res.user)
      return { success: true }
    } catch (err) {
      console.error("Error in login Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (data) => {
    try {
      setLoading(true)
      const res = await registerAPI(data)
      console.log(res)
      setUser(res.user)
      return { success: true }
    } catch (err) {
      console.error("Error in Register Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logoutAPI()
      setUser(null)
      return { success: true }
    } catch (err) {
      console.error("Error in logout Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async (data) => {
    try {
      setLoading(true)
      const res = await checkAuthAPI(data)
      setUser(res.user)
      return { success: true }
    } catch (err) {
      console.error("Error in login Route", err.message)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const getAllUser = async () =>{
    try {
      setIsCheckingUsers(true)
      const res = await getAllUserAPI()
      setAllUser(res.users)
      return { success: true }
    } catch (err) {
      console.error("Error in login Route", err.message)
      return { success: false }
    } finally {
      setIsCheckingUsers(false)
    }
  }

  return {
    handleLogin, handleLogout, handleRegister, checkAuth, loading, user, allUser,getAllUser,isCheckingUsers
  }

}