import { useUploadedPictures } from "@/hooks/use-upload-store";
import { ImagePlus, Trash2 } from "lucide-react";
import React, { useState } from "react";

export type UploadedFile = {
  secure_url: string
  original_filename: string
}

const UploadButton = () => {
  const { uploadPictures: setUploadPictures, uploadedPictures } = useUploadedPictures()
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  //
  //const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //  const selectedFiles = Array.from(event.target.files!) as File[];
  //  setFiles((prev) => [...prev, ...selectedFiles]);
  //};
  //
  //const uploadToCloudinary = async () => {
  //  const uploadUrl = "https://api.cloudinary.com/v1_1/brownson/upload";
  //  const uploadedFiles: UploadedFile[] = [];
  //
  //  for (const file of files) {
  //    const formData = new FormData();
  //    formData.append("file", file);
  //    formData.append("upload_preset", "tzg9hiuf"); // Replace with your Cloudinary preset
  //
  //    try {
  //      const response = await fetch(uploadUrl, {
  //        method: "POST",
  //        body: formData,
  //      });
  //      const data = await response.json();
  //      uploadedFiles.push({ secure_url: data.secure_url, original_filename: data.original_filename });
  //    } catch (error) {
  //      console.error("Upload failed", error);
  //    }
  //  }
  //
  //
  //  setUploads((prev) => [...prev, ...uploadedFiles]);
  //  setFiles([]);
  //};


  async function uploadPictures(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files!) as File[];
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
    const progressArray = Array(selectedFiles.length).fill(0);
    setUploadProgress(progressArray); // Initialize progress state
    const uploadedFiles: UploadedFile[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tzg9hiuf"); // Replace with your Cloudinary preset

      try {
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", uploadUrl);

          // Update progress
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              setUploadProgress((prev) => {
                const updated = [...prev];
                updated[i] = progress;
                return updated;
              });
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              uploadedFiles.push({
                secure_url: data.secure_url,
                original_filename: data.original_filename,
              });
              resolve();
            } else {
              reject(new Error("Upload failed"));
            }
          };

          xhr.onerror = () => reject(new Error("Upload failed"));
          xhr.send(formData);
        });
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    setUploadProgress([])
    setUploads((prev) => [...prev, ...uploadedFiles]);
  }

  function remove(id: number) {
    const remainingClothes = uploads.filter((_, index) => index !== id)
    setUploads(remainingClothes)
  }

  return (
    <div >
      <div>
        {uploads.length !== 0 ? (
          <div >
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 grid-flow-row gap-2">
              {uploads.map((file, index) => (
                <div className="relative h-[300px] rounded-md overflow-hidden">
                  <div className="z-10 absolute top-2 right-2">
                    <button type="button" onClick={() => remove(index)}>
                      <Trash2 className="size-6" color="red" />
                    </button>
                  </div>
                  <img
                    className="object-cover w-full h-[300px]"
                    alt={file.original_filename}
                    src={file.secure_url}
                  />
                </div>))}
            </div>

            {uploadProgress.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadProgress.map((progress, index) => (
                  <div key={index} className="w-full">
                    <div className="bg-gray-200 h-2 rounded">
                      <div
                        className="bg-RichBlack h-2 rounded"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      File {index + 1}: {progress}%
                    </p>
                  </div>
                ))}
              </div>)}
            <label
              htmlFor="upload-input"
              className="cursor-pointer flex justify-center mt-3 items-center border border-dotted border-RichBlack text-black py-2 px-4 rounded-md  transition-colors"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              <span>Upload More</span>
            </label>
            <input
              id="upload-input"
              type="file"
              accept=".heic,.jpg,.jpeg,.png,.mp4"
              multiple
              onChange={async (e) => await uploadPictures(e)}
              className="hidden"
            />
          </div>
        ) : uploadProgress.length > 0 ? (
          <div className="mt-4 space-y-2">
            {uploadProgress.map((progress, index) => (
              <div key={index} className="w-full">
                <div className="bg-gray-200 h-2 rounded">
                  <div
                    className="bg-RichBlack h-2 rounded"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  File {index + 1}: {progress}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <label
              htmlFor="upload-input"
              className="cursor-pointer flex justify-center h-[100px] items-center border border-dotted border-RichBlack text-black py-2 px-4 rounded-md  transition-colors"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              <span>Upload Picture</span>
            </label>
            <input
              id="upload-input"
              type="file"
              accept=".heic,.jpg,.jpeg,.png,.mp4"
              multiple
              onChange={async (e) => await uploadPictures(e)}
              className="hidden"
            />
          </>

        )}
      </div>
    </div>
  );
};

export default UploadButton;

