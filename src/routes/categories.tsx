import { createFileRoute } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/categories')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <div className="flex justify-between items-center">
        <label className="text-[2rem] lg:text-[3rem] font-Railway">Categories</label>
        <button className="flex gap-1 font-Lato font-semibold items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg">
          <span><PlusCircleIcon className="size-4" /></span>
          Add New Categories
        </button>
      </div>

      <div className="w-full bg-RichBlack h-[1px]" />
    </main>
  )
}
