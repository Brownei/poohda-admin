import { Link } from '@tanstack/react-router'
import React, { FC } from 'react'

type CardProps = {
  category: any
}

const Card: FC<CardProps> = ({ category }) => {
  console.log(category)
  return (
    <div className="min-h-[300px] max-w-[300px] lg:max-w-[200px]">
      <img src={category.pictures[0]} loading="lazy" className="object-cover size-[300px]" />
      <div className="px-3">
        <p className="font-Railway text-center font-semibold">{category.name}</p>
        <div className="flex justify-between mt-2 items-center font-Railway font-semibold">
          <Link to='/categories/$id' params={{ id: category.id }} className="bg-RichBlack py-1 px-3 text-PaleNimbus rounded-lg">Edit</Link>
          <Link to='/categories/$id' params={{ id: category.id }} className="bg-red-600 py-1 px-3 text-PaleNimbus rounded-lg">Delete</Link>
        </div>
      </div>
    </div>
  )
}

export default Card
