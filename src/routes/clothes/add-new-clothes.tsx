import { createFileRoute, Link, useLocation, useRouter } from '@tanstack/react-router'
import { ChevronLeft, LoaderCircle } from 'lucide-react'
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import axios from 'axios'
import React from 'react';
import UploadButton, { UploadedFile } from '../../components/ui/upload-button';
import { API_URL } from '../../lib/utils';
import { useForm, SubmitHandler } from "react-hook-form"
import { useAllCategories } from '../../hooks/queries/use-categories';
import { setServers } from 'dns';
import { useQueryClient } from '@tanstack/react-query';


type Inputs = {
  name: string
  description: string
  price: string
  category_id: string
  quantity: string
}

export const sizes = [
  'XS',
  'S',
  'M',
  'L',
  'XL',
  'XXL',
  'XXXL'
]


export const Route = createFileRoute('/clothes/add-new-clothes')({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [sizesSelected, setSizesSelected] = React.useState<string[]>([])
  const { data: categories, isLoading, error } = useAllCategories()
  const [uploads, setUploads] = React.useState<UploadedFile[]>([]);
  console.log(sizesSelected)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [isPending, setIsPending] = React.useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsPending(true)
    console.log(data)
    try {
      const response = await axios.post(`${API_URL}/clothes`, {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        category_id: Number(data.category_id),
        quantity: Number(data.quantity),
        pictures: uploads.map((p) => p.secure_url),
        sizes: sizesSelected
      })
      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["all-clothes"] })
        router.navigate({
          to: '/clothes'
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }

  if (isLoading) {
    <>Loading...</>
  }

  function selectSizes(index: string) {
    const includedSize = sizesSelected.find((s) => s === index)
    if (includedSize) {
      const filteredSizes = sizesSelected.filter((s) => s !== index)
      setSizesSelected(filteredSizes)
    } else {
      setSizesSelected((prev) => [...prev, index])
    }
  }

  return (
    <main>
      <div className='grid gap-10 font-Railway'>
        <Link to={'/clothes'} className='flex gap-1 font-Lato font-semibold justify-center w-fit items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg'>
          <ChevronLeft size={18} className='text-PaleNimbus' />
          <span>Back</span>
        </Link>

        {!isLoading && categories?.length === 0 && <span className='text-red-600 text-[0.8rem]'>*Categories are needed to be created first before creating products</span>}

        <UploadButton multiples={true} uploads={uploads} setUploads={setUploads} />
        <form className='grid w-full gap-4 text-[1rem]'>
          <div className='w-full flex items-center gap-4 flex-col lg:flex-row'>
            <div className='w-full grid gap-1 items-center lg:w-1/2'>
              <label className='font-semibold  text-[1.1rem]'>Name</label>
              <input disabled={!isLoading && categories.length === 0} {...register("name", { required: true })} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
            </div>
            <div className='w-full grid gap-1 items-center lg:w-1/2'>
              <label className='font-semibold  text-[1.1rem]'>Price</label>
              <input disabled={!isLoading && categories.length === 0} {...register("price", { required: true })} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
            </div>
          </div>
          <div className='w-full flex items-center gap-4 flex-col lg:flex-row'>
            <div className='w-full grid gap-1 items-center'>
              <label className='font-semibold  text-[1.1rem]'>Select a category</label>
              <select
                disabled={!isLoading && categories.length === 0}
                {...register("category_id", { required: true })}
                className="p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full"
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {isLoading ? (
                  <option>Loading....</option>
                ) : categories.length === 0 ? (
                  <option disabled>No categories created</option>
                ) : (
                  <>
                    {categories.map((category: any) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div className='w-full grid gap-1 items-center'>
              <label className='font-semibold  text-[1.1rem]'>Quantity</label>
              <input disabled={!isLoading && categories.length === 0} {...register("quantity", { required: true })} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
            </div>
          </div>

          <div className='w-full grid gap-1 items-center'>
            <label className='font-semibold text-[1.1rem]'>Sizes</label>
            <div className='flex flex-wrap gap-10'>
              {sizes.map((size, index) => (
                <button key={index} onClick={() => selectSizes(size)} type='button' className={`border-RichBlack font-Railway font-bold text-[1rem] size-[60px] md:size-[70px] lg:size-[80px] text-center ${sizesSelected.includes(size) ? 'border-2' : 'border'}`}>{size}</button>
              ))}
            </div>
          </div>


          <div className='w-full grid gap-1 items-center'>
            <label className='font-semibold text-[1.1rem]'>Description</label>
            <textarea disabled={!isLoading && categories.length === 0} {...register("description", { required: true })} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full min-h-[150px] lg:min-h-[200px]' />
          </div>

          <button onClick={handleSubmit(onSubmit)} type='button' disabled={(!isLoading && categories.length === 0) || isPending} className='bg-RichBlack hover:bg-HoverBlack font-semibold text-PaleNimbus w-full disabled:bg-HoverBlack flex items-center justify-center rounded-lg py-4'>{isPending ? <LoaderCircle className='size-5 animate-spin' /> : 'Create'}</button>
        </form>
      </div >
    </main >
  )
}
