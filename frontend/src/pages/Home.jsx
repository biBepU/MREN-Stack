import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ReceipeCard from '../components/ReceipeCard'
import Pagination from '../components/Pagination';
export default function Home() {



  let [receipes,setReceipes] = useState([])
  let [links , setLinks] = useState(null)
  let [error,setError] = useState(null)
  let location = useLocation();
  let searchQuery = new URLSearchParams(location.search);
  let page = searchQuery.get('page');
  
  page = parseInt(page, 10) || 1;
  let navigate = useNavigate();

  useEffect(() => {
    const fetchReceipes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/receipes?page=${page}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReceipes(data.data);
        setLinks(data.links);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch receipes:', error);
      }
    };

    fetchReceipes();
  }, [page]);
 

  // let links ={
  //     nextPage : true,
  //     prevPage : false,
  //     currentPage : 1,
  //     loopableLink :[
  //       {number :1},
  //       {number :2},
  //       {number :3}
  //     ]

  // };
  let onDeleted=(_id)=>{
   
    if(receipes.length===1 && page>1){
      
    navigate('/?page='+(page-1))
    }else{

      setReceipes(prev=> prev.filter(r=>r._id!==_id))
    }


  }
  return (
   <div className='space-y-3 w-full'> 
    {
      !!receipes.length && ( receipes.map(receipe=>(
       <ReceipeCard  key={receipe._id} receipe={receipe} onDeleted={onDeleted}/>
      ))
        
      )
    }

{!!links&& <Pagination links={links} page={page}/>}
   </div>
  )
}
