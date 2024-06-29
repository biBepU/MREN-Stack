import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className='flex justify-between p-5 items-center sticky top-0 bg-white'>
    <div className='text-3xl text-orange-500 font-bold '>Receipes</div>
    <div className='flex space-x-10 justify-center text-xl font-semibold'>
      <Link to='/' className='hover:text-orange-500'>Home</Link>
      <Link to='/about' className='hover:text-orange-500'>About</Link>
      <Link to='/contact' className='hover:text-orange-500'>Contact</Link>
      <Link to='/receipe/create' className='hover:text-orange-500'>Create</Link>

    </div>
  </nav>
  )
}
