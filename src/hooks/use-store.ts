import { create } from "zustand";

type ClothItem = {
  picture: File;
  name: string;
  price: number;
  description: string;
  size: string;
  color: string;
};

type ClothItemState = {
  clothing: ClothItem[]
  addClothes: (newCloth: ClothItem) => void
  deleteClothes: (clothId: number) => void
}

export const useClothesStore = create<ClothItemState>((set) => ({
  clothing: [],
  addClothes: (newClothe: ClothItem) =>
    set((state) => ({
      clothing: [
        ...state.clothing,
        newClothe
      ]
    })),
  deleteClothes: (id) =>
    set((state) => ({
      clothing: state.clothing.filter((_, index) => index !== id),
    })),
}));


