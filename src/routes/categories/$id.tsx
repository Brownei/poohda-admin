import { createFileRoute, Link, useLoaderData, useRouter } from '@tanstack/react-router'
import { ChevronLeft, LoaderCircle } from 'lucide-react'
import UploadButton, { UploadedFile } from '../../components/ui/upload-button'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useOneCategories } from '../../hooks/queries/use-one-categories'
import { useAllCategories } from '../../hooks/queries/use-categories'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { API_URL } from '../../lib/utils'

export const Route = createFileRoute('/categories/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.id
    }
  }
})

type Inputs = {
  name: string
  description: string
}

function RouteComponent() {
  const { id } = Route.useLoaderData()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)
  const { data: categories, isLoading, error } = useAllCategories()
  const { data: category, isLoading: isOneCategoryLoading, error: oneCategoryError } = useOneCategories(Number(id))
  //const category = categories.find((c: any) => c.id === Number(id))
  //console.log({ id: Number(id), category, categories })
  const [isFeatured, setIsFeatured] = React.useState(false)
  const [uploads, setUploads] = React.useState<UploadedFile[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  React.useEffect(() => {
    if (!isOneCategoryLoading && category !== undefined) {
      const categoryPictures: UploadedFile[] = category.pictures.map((c: string) => ({
        secure_url: c,
        original_filename: 'File'
      }))
      setUploads(categoryPictures)
      setIsFeatured(category.is_featured)
    }
  }, [isOneCategoryLoading, category])

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsPending(true)
    try {
      const response = await axios.put(`${API_URL}/categories/${Number(id)}`, {
        name: data.name,
        description: data.description,
        is_featured: isFeatured,
        pictures: uploads.map((p) => p.secure_url)
      })
      if (response.status === 202) {
        queryClient.invalidateQueries({ queryKey: ["all-categories"] })
        router.navigate({
          to: '/categories'
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }

  if (isLoading || isOneCategoryLoading) {
    return <>Loading...</>
  } else if (error) {
    return <>Errorr</>
  }

  console.log(category)

  return (
    <main>
      <div className='grid gap-10 font-Railway'>
        <Link to={'/categories'} className='flex gap-1 font-Lato font-semibold justify-center w-fit items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg'>
          <ChevronLeft size={18} className='text-PaleNimbus' />
          <span>Back</span>
        </Link>

        <UploadButton uploads={uploads} setUploads={setUploads} multiples={true} />

        <form className='grid w-full gap-4 text-[1rem]'>
          <div className='w-full grid gap-1 items-center '>
            <label className='font-semibold  text-[1.1rem]'>Name</label>
            <input {...register("name", { required: true })} defaultValue={category.name} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
          </div>

          <div className='w-full grid gap-1 items-center '>
            <label className='font-semibold  text-[1.1rem]'>Description</label>
            <input {...register("description", { required: true })} defaultValue={category.description} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
          </div>

          <div className='w-full flex gap-1 items-center '>
            <div className={`size-4 border border-RichBlack transition-colors duration-300 ${isFeatured ? 'bg-RichBlack' : 'bg-transparent'}`} onClick={() => setIsFeatured(prev => !prev)} />
            <label className='font-semibold  text-[1.1rem]'>Featured</label>
          </div>
          <button onClick={handleSubmit(onSubmit)} type='button' className='bg-RichBlack hover:bg-HoverBlack font-semibold text-PaleNimbus w-full disabled:bg-HoverBlack flex items-center justify-center rounded-lg py-4'>{isPending ? <LoaderCircle className='size-5 animate-spin' /> : 'Update'}</button>
        </form>
      </div>
    </main>

  )
}
