import { create } from "zustand";

type ClothItem = {
  picture: File;
  name: string;
  description: string;
  size: string;
  color: string;
};

const useClothesStore = create((set) => ({
  clothes: [] as ClothItem[],
  addClothes: (picture: File, name: string, description: string, size: string, color: string) => set((state) => ({clothes: [...state.clothes, {picture, name, description, size, color, id: Date.now()}]})),
  deleteClothes: (id) => set((state) => ({clothes: state.clothes.filter((item) => item.id !== id)}))
}));

export default useClothesStore;
