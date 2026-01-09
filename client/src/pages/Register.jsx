import React, { useState } from 'react'
import { User, Mail, Lock } from "lucide-react";
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, password });

        axios.post("http://localhost:3000/user/create-user", { name, email, password })
        .then((res) => {
            console.log("User registered successfully:", res.data);
            alert("Registration successful! Please login.");
            navigate("/login");
        })
        .catch((err) => {
            console.error("Error registering user:", err);
        });
    }

  return (
    <div className='flex flex-col items-center justify-center mt-5'>
        <h1 className='text-4xl text-blue-500 font-bold'>Sign up</h1>
        <p className='text-gray-400'>Join the community today!</p>
        <div className='bg-gray-50 mt-10 py-3 w-80 rounded-full shadow shadow-gray-300 flex items-center gap-14'>
            <img src={google} className='w-10 h-10 ml-5' alt="Google" />
            <p className='font-semibold text-blue-300'>Use Google account</p>
        </div>
        <div className='mt-10'>
            <div>
                <label>Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input onChange={(e) => setName(e.target.value)} type="text" name='name' className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none mt-1" placeholder="Enter your name" />
                </div>
            </div>
            <div>
                <label className='mt-1'>Email</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none mt-1" placeholder="Enter your email" />
                </div>
            </div>
            <div>
                <label className='mt-1'>Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:outline-none mt-1" placeholder="Enter your password" />
                </div>
            </div>
        </div>
        <div className='mt-10 flex flex-col items-center gap-5'>
            <button onClick={handleSubmit} className='bg-blue-500 text-white font-semibold w-80 rounded-full py-3'>Sign up</button>
            <div className='flex items-center gap-2'>
                <p className='opacity-60'>Already a member ?</p> <span className='text-blue-500 cursor-pointer'><Link to="/login">Login</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Register