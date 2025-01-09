import UploadButton from '@/components/ui/upload-button'
import { API_URL } from '@/lib/utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import React from 'react'

export const Route = createFileRoute('/categories/add-new-categories')({
  component: RouteComponent,
})

type Inputs = {
  name: string
}

function RouteComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [isPending, setIsPending] = React.useState(false)
  const [uploads, setUploads] = React.useState<UploadedFile[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsPending(true)
    try {
      const response = await axios.post(`${API_URL}/categories`, {
        name: data.name,
        picture: uploads[0].secure_url
      })
      if (response.status === 201) {
        alert("category created!")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <main>
      <div className='grid gap-10 font-Railway'>
        <Link to={'/categories'} className='flex gap-1 font-Lato font-semibold justify-center w-fit items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg'>
          <ChevronLeft size={18} className='text-PaleNimbus' />
          <span>Back</span>
        </Link>

        <UploadButton uploads={uploads} setUploads={setUploads} multiples={false} />

        <form className='grid w-full gap-4 text-[1rem]'>
          <div className='w-full grid gap-1 items-center '>
            <label className='font-semibold  text-[1.1rem]'>Name</label>
            <input {...register("name", { required: true })} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
          </div>

          <button onClick={handleSubmit(onSubmit)} type='button' className='bg-RichBlack hover:bg-HoverBlack font-semibold text-PaleNimbus w-full disabled:bg-HoverBlack flex items-center justify-center rounded-lg py-4'>Create</button>
        </form>
      </div>
    </main>
  )
}
