import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import axios from '../harpers/axios'
export default function NavBar() {
  const [isMenu,setIsMenu] = useState(false)
  let navigate = useNavigate();
  let {user,dispatch}= useContext(AuthContext)

 


  let logOut =async()=>{
  let res = await axios.post('/api/users/logout');
  if(res.status===200){
    dispatch({type:"LOG_OUT"})
    navigate('/sign-in')
  }
 }
  return (
    <>
    <nav className=' justify-between p-5 items-center hidden lg:flex bg-white sticky top-0'>
    <div className='text-3xl text-orange-500 font-bold '>Receipes</div>
    <div className='flex space-x-10 justify-center text-xl font-semibold'>
 {user &&  <Link to='/user-profile' className='hover:text-orange-500'>{user.name}</Link>}
      <Link to='/' className='hover:text-orange-500'>Home</Link>
      <Link to='/about' className='hover:text-orange-500'>About</Link>
      <Link to='/contact' className='hover:text-orange-500'>Contact</Link>
      <Link to='/receipe/create' className='hover:text-orange-500'>Create</Link>
      <Link to='/usermanage' className='hover:text-orange-500'>User Info</Link>
      {!user && <>
        <Link to='/sign-up' className='hover:text-orange-500'>SignUp</Link>
        <Link to='/sign-in' className='hover:text-orange-500'>SignIn</Link>
      </>}
     {!!user &&  <button onClick={logOut} className='hover:text-orange-500'>LogOut</button>}

    </div>
    </nav>
    <nav className='flex justify-between p-5 items-center lg:hidden  bg-white'>
    <div className='text-3xl text-orange-500 font-bold '>Receipes</div>
      {isMenu && 
      <div className='w-40 bg-gray-50 shadow-xl rounded-lg  absolute top-12 right-0'>
      <div className='flex flex-col gap-8 items-center my-5 justify-center text-xl font-semibold ' >
        <Link to='/' className='hover:text-orange-500'>Home</Link>
        <Link to='/about' className='hover:text-orange-500'>About</Link>
        <Link to='/contact' className='hover:text-orange-500'>Contact</Link>
        <Link to='/receipe/create' className='hover:text-orange-500'>Create</Link>
         <Link to='/usermanage' className='hover:text-orange-500'>User Info</Link>
        {!user &&
        <>
          <Link to='/sign-up' className='hover:text-orange-500'>SignUp</Link>
          <Link to='/sign-in' className='hover:text-orange-500'>SignIn</Link>
          </>}
       {!!user &&  <button onClick={logOut} className='hover:text-orange-500'>LogOut</button>}

      </div>
    </div>}
      <button onClick={()=>setIsMenu(!isMenu)}>menu</button>
    </nav>
    
    </>
  )
}
