import React, { useState } from 'react'
import { redirect } from '@tanstack/react-router'
import axios from 'axios'
import Carousel from './ui/carousel'
import { useForm, SubmitHandler } from "react-hook-form"
import { LoaderCircle } from 'lucide-react'
import { API_URL } from '@/lib/utils'

type Inputs = {
  username: string
  password: string
}

const images = [
  "/SML02098.jpg",
  "/SML02102.jpg",
  "/SML02045.jpg",
  "/IMG_7523.jpg",
  "/IMG_7532.jpg",
  "/IMG_7583.jpg",
  "/SML02050.jpg",
]

const Login = () => {
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsPending(true)
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: data.username,
        password: data.password
      })
      if (response) {
        localStorage.setItem("admin", response.data)
        window.location.assign('/home')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <main>
      <div className='flex'>
        <div className='w-1/2 flex flex-col justify-center items-center bg-PaleNimbus'>
          <img src="/PoohDa White gradient glitch.png" className="max-w-[250px]" alt="Logo" loading='lazy' />
          <h1 className='font-Disamber -mt-24 text-[2.2rem] tracking-wider'>Be da Difference</h1>

          <form className='flex flex-col gap-4 items-center font-semibold font-Railway min-w-[400px] mt-4'>
            <div className='grid gap-1 w-full'>
              <input disabled={isPending} className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' placeholder='Username' {...register("username", { required: true })} />
              {errors.username && <span className='text-red-600 text-[0.8rem]'>*Username is required</span>}
            </div>
            <div className='grid gap-1 w-full'>
              <input disabled={isPending} type='password' className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' placeholder='Password' {...register("password", { required: true })} />
              {errors.password && <span className='text-red-600 text-[0.8rem]'>*Password is required</span>}
            </div>

            <button type='button' disabled={isPending} onClick={handleSubmit(onSubmit)} className='bg-RichBlack hover:bg-HoverBlack text-PaleNimbus w-full disabled:bg-HoverBlack flex items-center justify-center rounded-lg py-4'>{isPending ? <LoaderCircle className='size-5 animate-spin' /> : 'Log In'}</button>
          </form>
        </div>

        <Carousel slides={images} />
      </div>
    </main>
  )
}

export default Login
