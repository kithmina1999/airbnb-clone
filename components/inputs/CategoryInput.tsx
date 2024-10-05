'use client'
import React from 'react'
interface CategoryInputProps{
    icon:JSX.Element
    label:string
    selected:boolean
    onClick:(value:string)=>void
}

const CategoryInput = ({
    icon,
    label,
    selected,
    onClick
}:CategoryInputProps) => {
  return (
    <div
    onClick={()=>onClick(label)} 
    className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? 'border-black':'border-neutral-200'}
    `}>
        <p className='text-xl'>{icon}</p>
        <div className='font-semibold'>
            {label}
        </div>
    </div>
  )
}

export default CategoryInput