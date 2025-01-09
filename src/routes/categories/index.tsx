import Card from '@/components/ui/Card'
import { useAllCategories } from '@/hooks/queries/use-categories'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PlusCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: categories, isLoading, error } = useAllCategories()

  if (isLoading) {
    return (
      <>Loading....</>
    )
  }

  return (
    <main className='grid gap-3'>
      <div className="flex flex-col items-start lg:justify-between lg:items-center lg:flex-row">
        <label className="text-[2rem] lg:text-[3rem] font-Railway">Categories</label>
        <Link to={'/categories/add-new-categories'} className="flex gap-1 font-Lato font-semibold items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg">
          <span><PlusCircleIcon className="size-4" /></span>
          Add New Categories
        </Link>
      </div>

      <div className="w-full bg-RichBlack h-[1px]" />
      <div className="grid grid-cols-1 gap-5 lg:gap-0 items-center lg:grid-cols-3 grid-flow-row">
        {categories.map((category) => (
          <Card category={category} />
        ))}
      </div>
    </main>
  )
}
