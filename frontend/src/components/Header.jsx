import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className=' bg-black text-white w-full h-12 flex justify-between items-center px-32'>
            <div className='text-2xl'>Logo </div>
            <div className='flex space-x-10'>
                <Link to="/">Home</Link>
                <Link to="/create-blog"> Create Blog</Link>
                <Link to="/blogs"> All Blogs </Link>
                <Link to="/login">Login </Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div >
    )
}

export default Header
