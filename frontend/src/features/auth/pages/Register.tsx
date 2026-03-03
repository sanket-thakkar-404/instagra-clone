import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import {useAuth} from "../hooks/useAuth.js"
import { useState } from 'react'
import { toast } from 'sonner'

const Register = () => {
  const [formData , setFormData] =useState({
    username :"",
    password:"",
    email :"",
    fullname:""
  })
  const navigate = useNavigate()
  const {handleRegister , loading} = useAuth()

  const handleChange = (e) =>{
    const {name ,value} = e.target

    setFormData((prev) => ({
    ...prev,
    [name]: value
    }));  
  }


  const handleSubmit = async(e) =>{
    e.preventDefault()
    const res = await handleRegister(formData);
    if(res.success){
      navigate('/')
      toast.success("Welcome To Instagram")
    } else {
      toast.error("Invalid Credentials")
    }
  }
 
  return (
    <div className="min-h-screen bg-[#152127] flex items-center justify-center px-4">
      
      <div className="w-full max-w-md text-white space-y-6">
        
        {/* Back + Meta */}
        <div className="space-y-2 flex items-center gap-2">
          <Link to='/login'>
          <ArrowLeft className='text-gray-400 mt-2 text-xl'/>
          </Link>
          <p className="text-base text-gray-400 ">Meta</p>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-2xl font-semibold">
            Get started on Instagram
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign up to see photos and videos from your friends.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Mobile / Email */}
       <FormInput type='email' placeholder='Email' label='Email' name='email' value={formData.email} onChange={handleChange}/>
         <p className="text-xs text-gray-400">
            You may receive notifications from us.
            <span className="text-blue-400 cursor-pointer">
              {" "}Learn why we ask for your contact information
            </span>
          </p>

        {/* Password */}
       <FormInput label="Password" type='Password' placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>

        {/* Name */}
       <FormInput type='text' placeholder='Full Name' label='Full Name' name='fullname' value={formData.fullname} onChange={handleChange} />

        {/* Username */}
        <FormInput type='text' placeholder='Username' label='Username' name='username' value={formData.username} onChange={handleChange} />

        {/* Terms Text */}
        <div className="text-xs text-gray-400 space-y-3 leading-relaxed">
          <p>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="text-blue-400 cursor-pointer">
              Learn more.
            </span>
          </p>

          <p>
            By tapping Submit, you agree to Instagram's{" "}
            <span className="text-blue-400">Terms</span>,{" "}
            <span className="text-blue-400">Privacy Policy</span> and{" "}
            <span className="text-blue-400">Cookies Policy</span>.
          </p>

          <p>
            The <span className="text-blue-400">Privacy Policy</span>{" "}
            describes how we use your information.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-2">
          <button type='submit' className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-full font-medium">
            Submit
          </button>

          <Link to="/login" className="w-full block text-center border border-gray-600 py-3 rounded-full text-gray-300">
            I already have an account
          </Link>
        </div>
        </form>

      </div>
    </div>
  )
}

export default Register
