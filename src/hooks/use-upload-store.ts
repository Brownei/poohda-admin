import { UploadedFile } from "@/components/ui/upload-button";
import { create } from "zustand";

type UploadedPictureState = {
  uploadedPictures: UploadedFile[]
  uploadPictures: (picture: UploadedFile[]) => void
}

export const useUploadedPictures = create<UploadedPictureState>((set) => ({
  uploadedPictures: [],
  uploadPictures: (pictures: UploadedFile[]) =>
    set((state) => ({
      uploadedPictures: [
        ...state.uploadedPictures,
        ...pictures,
      ],
    })),
}));



