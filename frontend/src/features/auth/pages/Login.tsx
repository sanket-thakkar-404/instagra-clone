import LoginLeftSide from '../components/LoginLeftSide'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useState} from 'react'
import {useAuth} from '../hooks/useAuth.js'
import { toast } from 'sonner'

const Login = () => {

  const navigate = useNavigate()
  const {handleLogin , loading,user} = useAuth()
  const [formData , setFormData] = useState({
    email : "",
    password :""
  })

  const handleChange = (e)=>{
    const {value , name} = e.target
    setFormData((prev)=> ({
      ...prev,
      [name] : value
    }))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(formData)

    const res = await handleLogin(formData)
    if(res.success){
      toast.success("Login Successfully")
      navigate("/")
    }
    setFormData({
      email :"",
      password :""
    })
  }

  if(loading) return (
    <div className='absolute flex items-center justify-center h-screen'>
      <h2>loading...</h2>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0b141a] text-white flex flex-col">
      {/* Main Section */}
      <div className="flex flex-1">
        
        {/* Left Side */}
        <LoginLeftSide/>

        {/* Right Side */}
        <div className="w-full lg:w-2/6 flex justify-center items-center bg-[#152127] border-l border-gray-600">
          
          <div className="mx-auto w-[85%] space-y-6">
            
            <h2 className="text-xl font-medium">Log into Instagram</h2>

            <div className="space-y-4">
             <form onSubmit={handleSubmit}>
              <FormInput type='text' placeholder="Email or Username" name='email' value={formData.email} onChange={handleChange}/>
             <FormInput type='password' placeholder="Password" name='password'value={formData.password} onChange={handleChange}/>

             <button type='submit' className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl font-medium">
              Log in
            </button>
             </form>
            </div>

            

            <p className="text-center text-sm text-gray-400 cursor-pointer">
              Forgot password?
            </p>

            <div className="border-t border-gray-700 pt-6 space-y-4">
              <button className="w-full border border-gray-600 py-3 rounded-xl">
                Log in with Facebook
              </button>

              <Link to="/register" className="w-full mt-10 block text-center border border-blue-500 text-blue-400 py-3 rounded-xl">
                Create new account
              </Link>
            </div>

            <p className="text-center text-xs text-gray-500 pt-6">
              © 2026 Instagram from Meta
            </p>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 text-gray-500 text-sm py-4 text-center">
        Meta · About · Blog · Jobs · Help · API · Privacy · Terms
      </div>

    </div>
  )
}

export default Login
