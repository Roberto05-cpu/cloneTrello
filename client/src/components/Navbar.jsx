import React from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-5 flex justify-between items-center pb-5 border-b border-b-gray-500'>
        <div className='flex items-center gap-1'>
            <img src={logo} className='w-10 h-10' alt="Logo" />
            <h1 className='text-[20px] font-bold'><span className='text-blue-700'>Y-</span>Trello</h1>
        </div>
        <ul className='flex items-center gap-10'>
            <li className='text-blue-500 font-semibold'><Link to="/">Home</Link></li>
            <li className=''><Link to="/about">About</Link></li>
        </ul>
        <div className='flex items-center gap-5'>
            <button className='cursor-pointer font-semibold'><Link to="/login">Login</Link></button>
            <button className='bg-black text-white px-8 py-4 rounded-full cursor-pointer'><Link to="/register">Sign Up</Link></button>
        </div>
    </div>
  )
}

export default Navbar