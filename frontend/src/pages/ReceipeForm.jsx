import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { BsPlusSquareFill } from "react-icons/bs";
import Ingredients from '../components/Ingredients';

import axios from 'axios' ;
import { useNavigate, useParams } from 'react-router-dom';

export default function ReceipeForm() {
  let [ingredients,setIngredients] = useState([]);
  let [newIngredients,setNewIngredients] =useState('')
  let [title,setTitle] = useState('');
  let [description,setDescription] = useState('');
  let [error,setError] = useState('');

  let navigate = useNavigate();

  let {id} = useParams();
 

  useEffect(()=>{
    let fetchReceipe=async()=>{
      if(id){
        let res= await axios.get('http://localhost:8000/api/receipes/'+id)
        if(res.status===200){
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients)
        }
      }
    }
    fetchReceipe()
  },[id])

  let addIngredient = ()=>{
    console.log('hit')
    setIngredients(prevState=>[newIngredients,...prevState])
    setNewIngredients('')
  };

  let summitReceipe =async(e)=>{
   try{
    e.preventDefault();

    let receipe ={
      title,
      description,
      ingredients
    }
    let res;
   if(id){
     res= await axios.patch('http://localhost:8000/api/receipes/'+id,receipe)
   }else{
    res= await axios.post('http://localhost:8000/api/receipes',receipe)
   }
   if (res.status===200){
    navigate('/')
   }
   

   }catch(err){
    setError (Object.keys(err.response.data.error))
    console.log(error)
   }
  }
  return (
    <div className='mx-auto max-w-md border-2 border-white p-4'>
        <h1 className='text-2xl font-bold text-orange-400 mb-6'>Receipe {id?'Edit':'Create'} Form</h1>
        <form action="" className='space-y-5' onSubmit={summitReceipe}>
         <ul className='list-disc pl-3'>
         {!!error.length && error.map((error,i)=>(
            <li key={i} className='text-red-500 text-sm'>{error} can't be invalid </li>
          ))}
         </ul>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Receipe Title' className='w-full p-1'/>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  rows='5' className='w-full p-1'></textarea>
           <div className='flex items-center gap-2'>
           <input value={newIngredients} onChange={(e)=>setNewIngredients(e.target.value)} type="text" placeholder='Receipe Ingredients' className='w-full p-1'/>
           <motion.span
           whileTap ={{scale : 0.75}}
           onClick={addIngredient}
           ><BsPlusSquareFill className='text-3xl text-orange-400 cursor-pointer'/></motion.span>
           </div>
           <motion.button
           
           whileTap={{scale:0.95}}
           type='summit'
           className='w-full px-3 py-1 bg-orange-400 rounded-full text-white'>{id?'Edit':'Create'} Receipe</motion.button>

           <Ingredients ingredients={ingredients}/>


        </form>
    </div>
  )
}
