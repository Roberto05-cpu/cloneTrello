import React from 'react'
import { Mail, Lock } from "lucide-react";
import google from '../assets/google.png'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
        <div className='flex flex-col items-center justify-center mt-15'>
        <h1 className='text-4xl text-blue-500 font-bold'>Login</h1>
        <p className='text-gray-400'>Welcome member</p>
        <div className='bg-gray-50 mt-10 py-3 w-80 rounded-full shadow shadow-gray-300 flex items-center gap-14'>
            <img src={google} className='w-10 h-10 ml-5' alt="Google" />
            <p className='font-semibold text-blue-300'>Use Google account</p>
        </div>
        <div className='mt-10'>
            <div>
                <label className='mt-1'>Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input type="email" className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none mt-1" placeholder="Enter your email" />
                </div>
            </div>
            <div>
                <label className='mt-1'>Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input type="password" className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none mt-1" placeholder="Enter your password" />
                </div>
            </div>
        </div>
        <div className='mt-10 flex flex-col items-center gap-5'>
            <button className='bg-blue-500 text-white font-semibold w-80 rounded-full py-3'>Login</button>
            <div className='flex items-center gap-2'>
                <p className='opacity-60'>Don't have an account?</p> <span className='text-blue-500 cursor-pointer'><Link to="/register">Sign up</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Login