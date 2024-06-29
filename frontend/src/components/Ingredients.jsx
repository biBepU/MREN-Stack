import React from 'react'

export default function Ingredients({ingredients}) {
  return (
    <div>
         <div className='space-x-3'>
          <span>  ingrident -</span>
          {!!ingredients.length && (
              ingredients.map((ingredient,i)=>(
              <span key={i} className='bg-orange-400 text-white rounded-full text-sm px-2 py-1 items-center'> {ingredient}</span>
          )))}
        
        </div>
    </div>
  )
}
