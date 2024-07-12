import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { BsPlusSquareFill } from "react-icons/bs";
import Ingredients from '../components/Ingredients';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from '../harpers/axios' ;
import { useNavigate, useParams } from 'react-router-dom';

export default function ReceipeForm() {
  let [ingredients,setIngredients] = useState([]);
  let [newIngredients,setNewIngredients] =useState('')
  let [title,setTitle] = useState('');
  let [description,setDescription] = useState('');
  let [error,setError] = useState('');
  let [file,setFile] = useState(null) ;
  let [preview,setPreview] =useState(null);
  let [loading, setLoading] = useState(false);

  

  let navigate = useNavigate();

  let {id} = useParams();
  const handleDescriptionChange = (content, delta, source, editor) => {
    setDescription(content);
  };

  useEffect(()=>{
    let fetchReceipe=async()=>{
      if(id){
        let res= await axios.get('/api/receipes/'+id)
        if(res.status===200){
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients)
          setPreview(import.meta.env.VITE_BACKEND_URL+res.data.photo)
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

    setLoading(true)

    let receipe ={
      title,
      description,
      ingredients
    }
    let res;
   if(id){
     res= await axios.patch('/api/receipes/'+id,receipe)
   }else{
    res= await axios.post('/api/receipes',receipe)
   }

   if (file){
    let formData = new FormData;
   formData.set('photo',file)
   let uploadRes = await axios.post(`/api/receipes/${res.data._id}/upload`,
    formData,{
      headers :{
        Accept : "multipart/form-data"
      }
    }
   )
   console.log(uploadRes)
   }

   
   

   if (res.status===200){
    setLoading(false)
    navigate('/')
   }
   
   }catch(err){
    setLoading(false);
    setError (Object.keys(err.response.data.error));
    console.log(error)
   }
  };

  let upload = (e) => {

    let file = e.target.files[0]; // Get the first file from the files array
    setFile(file);

    if (file) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            setPreview(e.target.result); // This will be the data URL
        };
        fileReader.readAsDataURL(file); // Pass the file object here
    } else {
        console.error('No file selected');
    }
};
  return (
    <div className='mx-auto max-w-md border-2 border-white p-4'>
        <h1 className='text-2xl font-bold text-orange-400 mb-6'>Receipe {id?'Edit':'Create'} Form</h1>
        <form action="" className='space-y-5' onSubmit={summitReceipe}>
        <input type="file" onChange={upload}/>
        <img src={preview} alt="" />
         <ul className='list-disc pl-3'>
         {!!error.length && error.map((error,i)=>(
            <li key={i} className='text-red-500 text-sm'>{error} can't be invalid </li>
          ))}
         </ul>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Receipe Title' className='w-full p-1'/>
            <div className="w-full p-1">
      <ReactQuill
        value={description}
        onChange={handleDescriptionChange}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
          ],
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet'
        ]}
        className="w-full p-1 bg-white"
        
      />
    </div>
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
           className='w-full px-3 py-1 bg-orange-400 rounded-full text-white flex items-center justify-center gap-3'>
            {id?'Edit':'Create'} Receipe
          {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>}
           </motion.button>

           <Ingredients ingredients={ingredients}/>


        </form>
    </div>
  )
}
