import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Ingredients from '../components/Ingredients'

import axios from '../harpers/axios';
export default function ReceipeDetail() {
  let [ingredients,setIngredients] = useState([]);
  let [title,setTitle] = useState('');
  let [description,setDescription] = useState('');
  let [photo,setPhoto] = useState('');
  let {id} = useParams();
  
  useEffect(()=>{
    let fetchReceipe=async()=>{
      if(id){
        let res= await axios.get('/api/receipes/'+id)
        if(res.status===200){
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients)
          setPhoto(import.meta.env.VITE_BACKEND_URL+res.data.photo)
          console.log(res.data)
        }
      }
    }
    fetchReceipe()
  },[id])
  return (
    < div className='w-full h-auto'>
    <h1 className='text-3xl font-bold '>{title}</h1>
    <div className=' flex'>
      
      <img className='w-[500px] h-auto' src={photo}></img>
      
      <div>
      <Ingredients ingredients={ingredients}/>
      description-
      <div dangerouslySetInnerHTML={{ __html: description }} />

      </div>

    </div>
    </div >
  )
}
