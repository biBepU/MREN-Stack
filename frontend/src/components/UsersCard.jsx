import React from 'react'
import axios from '../harpers/axios'
import { motion } from 'framer-motion';
export default function UsersCard({users,onDeleted}) {
  const handleButtonClick =async () => {
   
   
    let res= await axios.delete('/api/users/usermanage/'+user._id)
    if(res.status===200){
     onDeleted(users._id)
    }
  };

  return (
    <div>
      <motion.div
         initial={{opacity:0,y:200,}}
         animate={{opacity:1,y:0,}}
         exit={{opacity:0,y:200,}}
       
    
       className='bg-white p-5 rounded-xl space-y-4 shadow-xl hover:bg-slate-300 flex justify-between'>
        <div>
          
        <h1 className='text-xl font-bold text-orange-400 '>{users.name}</h1>
        <div>
       
        <p>email- {users.email}</p>
        </div>

        
       
        <p className='text-gray-500'>Publish at -{users.createdAt}</p>

        </div>
      <div className='flex gap-3' >
     
        <motion.button whileTap={{scale:0.85}} className='bg-red-500 h-8 w-12 rounded-md
         text-white' onClick={handleButtonClick}>Delete</motion.button>
      </div>
        </motion.div>
    </div>
  
  )
}
