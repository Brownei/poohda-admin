import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import axios from 'axios'
import React from 'react';
import UploadButton from '@/components/ui/upload-button';


export const Route = createFileRoute('/clothes/add-new-clothes')({
  component: RouteComponent,
})

function RouteComponent() {
  const cloudName = 'brownson';
  const uploadPreset = 'tzg9hiuf';

  // State
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [publicId, setPublicId] = React.useState('');

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // Replace with your upload preset
    formData.append("cloud_name", cloudName); // Replace with your cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setImage(response.data.secure_url);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main>
      <div className='grid gap-10 font-Railway'>
        <Link to={'/clothes'} className='flex gap-1 font-Lato font-semibold justify-center w-fit items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg'>
          <ChevronLeft size={18} className='text-PaleNimbus' />
          <span>Back</span>
        </Link>

        <UploadButton />
        <form className='grid w-full gap-4 text-[1rem]'>
          <div className='w-full flex items-center gap-4 flex-col lg:flex-row'>
            <div className='w-full grid gap-1 items-center lg:w-1/2'>
              <label className='font-semibold  text-[1.1rem]'>Name</label>
              <input className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
            </div>
            <div className='w-full grid gap-1 items-center lg:w-1/2'>
              <label className='font-semibold  text-[1.1rem]'>Price</label>
              <input className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
            </div>
          </div>
          <div className='w-full grid gap-1 items-center'>
            <label className='font-semibold  text-[1.1rem]'>Quantity</label>
            <input className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full ' />
          </div>
          <div className='w-full grid gap-1 items-center'>
            <label className='font-semibold text-[1.1rem]'>Description</label>
            <textarea className='p-4 border border-RichBlack disabled:bg-gray-100 focus:outline-none rounded-lg w-full min-h-[150px] lg:min-h-[200px]' />
          </div>

          <button type='button' className='bg-RichBlack hover:bg-HoverBlack font-semibold text-PaleNimbus w-full disabled:bg-HoverBlack flex items-center justify-center rounded-lg py-4'>Create</button>
        </form>
      </div>
    </main>
  )
}
