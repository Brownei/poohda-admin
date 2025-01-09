import { PlusCircleIcon } from "lucide-react";
import Table from "@/components/ui/table";
import { createFileRoute, Link } from '@tanstack/react-router'
import { useAllClothes } from "@/hooks/queries/use-clothes";
import { useAllCategories } from "@/hooks/queries/use-categories";

export const Route = createFileRoute('/clothes/')({
  component: RouteComponent,
})

export type ClothingItem = {
  name: string;
  price: number;
  description: string;
  quantity: boolean;
  category: string;
};

export const clothingList: any[] = [
  {
    name: "Vintage T-Shirt",
    price: 29.99,
    description: "A classic cotton t-shirt.",
    soldOut: false,
    category: "Tops",
  },
  {
    name: "Denim Jeans",
    price: 49.99,
    description: "Stylish and comfortable jeans.",
    soldOut: false,
    category: "Bottoms",
  },
  {
    name: "Leather Jacket",
    price: 129.99,
    description: "Premium quality leather jacket.",
    soldOut: true,
    category: "Outerwear",
  },
  {
    name: "Canvas Sneakers",
    price: 59.99,
    description: "Durable and fashionable sneakers.",
    soldOut: false,
    category: "Footwear",
  },
];


function RouteComponent() {
  const { data: clothes, isLoading, error } = useAllClothes()
  const { data: categories, isLoading: isCategoriesLoading, error: categoriesError } = useAllCategories()
  if (isLoading || isCategoriesLoading) {
    return (
      <>LOADING....</>
    )
  }
  return (
    <main className="grid gap-3">
      <div className="flex flex-col items-start lg:justify-between lg:items-center lg:flex-row">
        <label className="text-[2rem] lg:text-[3rem] font-Railway">List of Products</label>
        <Link to="/clothes/add-new-clothes" className="flex gap-1 font-Lato font-semibold w-fit items-center px-5 py-2 bg-RichBlack text-PaleNimbus rounded-lg">
          <span><PlusCircleIcon className="size-4" /></span>
          Add New Clothing
        </Link>
      </div>

      <div className="w-full bg-RichBlack h-[1px]" />
      <Table categories={categories} clothingList={clothes} />
    </main>
  )
}

