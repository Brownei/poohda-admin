import React from 'react'
import { ClothingItem } from '@/routes/clothes'
import { EllipsisVertical } from 'lucide-react'
import { formatNaira } from '@/lib/utils'

const Table = ({ clothingList, categories }: { clothingList: any[], categories: any[] }) => {
  return (
    <div className="overflow-x-auto font-Lato">
      <table className="min-w-full divide-y divide-border rounded-md shadow-sm bg-background text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Name</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Price</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Description</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Sold Out</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Category</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Quantity</th>
            <th className="px-4 py-2 text-left font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-b [&>tr]:last-child:border-0 divide-y divide-border">
          {clothingList.length === 0 ? (
            <div className='absolute top-[50%] left-[50%] lg:left-[59%] translate-x-[-50%] translate-y-[-50%] z-30 font-bold font-Railway text-[1.3rem]'>No products</div>
          ) : (
            <>
              {clothingList.map((item, index) => {
                const category = categories.find((c) => c.id === item.category_id)
                return (

                  <tr
                    key={index}
                    className={`hover:bg-muted transition-colors ${item.quantity === 0 ? "text-muted-foreground" : "text-foreground"
                      }`}
                  >
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{formatNaira(item.price)}</td>
                    <td className="px-4 py-3 line-clamp-3 overflow-hidden">{item.description}</td>
                    <td className="px-4 py-3">{item.quantity === 0 ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3"><EllipsisVertical className='size-3 text-RichBlack' /></td>
                  </tr>
                )
              })}
            </>
          )}
        </tbody>
      </table>
    </div >)
}

export default Table
