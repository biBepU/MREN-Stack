import React, { useState } from 'react'
import {motion} from 'framer-motion'
import axios from 'axios';
import Ingredients from '../components/Ingredients'
import { Link } from 'react-router-dom';

export default function ReceipeCard({receipe,onDeleted}) {
  const [isAnimating, setIsAnimating] = useState(true);

   const handleButtonClick =async (event) => {
    event.stopPropagation();
    setIsAnimating(false); 
    let res= await axios.delete('http://localhost:8000/api/receipes/'+receipe._id)
    if(res.status===200){
     onDeleted(receipe._id)
    }
  };

  const handleParentTap = () => {
    if (isAnimating) {
      console.log('Parent div tapped');
    }
    setIsAnimating(true); // Reset the animation state
  };

  return (
    <div>
      <motion.div
         initial={{opacity:0,y:200,}}
         animate={{opacity:1,y:0,}}
         exit={{opacity:0,y:200,}}
       
        
      onClick={handleParentTap }
      whileTap={isAnimating ? {scale:0.95}:{}}
       className='bg-white p-5 rounded-xl space-y-4 shadow-xl hover:bg-slate-300 flex justify-between'>
        <div>
          
        <h1 className='text-xl font-bold text-orange-400 '>{receipe.title}</h1>
        <div>
        <p>description</p>
        <p> {receipe.description}</p>
        </div>

        <Ingredients ingredients={receipe.ingredients}/>
       
        <p className='text-gray-500'>Publish at -{receipe.createdAt}</p>

        </div>
      <div className='flex gap-3'>
      <Link to={`/receipe/edit/${receipe._id}`} className='bg-blue-500 h-8 w-12 rounded-md flex text-center items-center justify-center
         text-white' >Edit</Link> 
        <motion.button whileTap={{scale:0.85}} className='bg-red-500 h-8 w-12 rounded-md
         text-white' onClick={handleButtonClick}>Delete</motion.button>
      </div>
        </motion.div>
    </div>
  )
}
