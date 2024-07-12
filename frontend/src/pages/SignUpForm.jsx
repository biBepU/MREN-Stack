
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../harpers/axios';

export default function SignUpForm() {
    let navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('')
    const [error,setError] = useState(null);

    const register = async(e)=>{
        e.preventDefault();
        setError(null)
      if(password!==confirmPassword){
    
         return
      

      }
      try{
        let data ={
            name,
            email,
            password
        }

        let res= await axios.post('/api/users/register',data,{
            withCredentials :true
        })
        if(res.status===200){
            alert('plese login')
            navigate('/')
        }
       
    }catch(e){
        setError(e.response.data.error)
    }
    }
  return (
    <div className='w-full'>
     
        <div className="bg-grey-lighter min-h-auto flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form
                onSubmit={register}
                 className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl font-semibold text-center">Sign up</h1>
                    <h3 className="mb-8 text-xl text-center">Register your account</h3>
                    {!!(error && error.name)&& <p className='text-red-500 text-xs italic'>{error.name.msg}</p>}
                    <input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name" />
                    
                    {!!(error && error.email)&& <p className='text-red-500 text-xs italic'>{error.email.msg}</p>}
                    <input 
                    value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />
                    {!!(error && error.password)&& <p className='text-red-500 text-xs italic'>{error.password.msg}</p>}
                    <input 
                    value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                       
                    <input 
                    value={confirmPassword}
                    onChange={(e)=>setconfirmPassword(e.target.value)}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-orange-400 hover:bg-orange-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>
                     <div className="text-center text-sm text-grey-dark mt-4 ">
                       <span> If you already hvae an account</span> 
                       
                    <Link
                        to='/sign-in'
                        className=" text-center py-2 px-1 mx-2 rounded bg-orange-400 hover:bg-orange-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Sign In</Link>
                    </div>
                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline  text-orange-400" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline   text-orange-400" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </form>

             
            </div>
        </div>
    </div>
  )
}
