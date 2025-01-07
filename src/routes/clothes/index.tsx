import { PlusCircleIcon } from "lucide-react";
import Table from "@/components/ui/table";
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/clothes/')({
  component: RouteComponent,
})

export type ClothingItem = {
  name: string;
  price: number;
  description: string;
  soldOut: boolean;
  category: string;
};

export const clothingList: ClothingItem[] = [];


function RouteComponent() {
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
      <Table clothingList={clothingList} />
    </main>
  )
}

