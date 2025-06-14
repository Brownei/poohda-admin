import OrdersTable from '../components/ui/orders-table'
import { createFileRoute } from '@tanstack/react-router'
import { clothingList } from './clothes'
import { useAllOrders } from '../hooks/queries/use-orders'

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: orders, isLoading, error } = useAllOrders()
  if (isLoading) {
    return <>isLoading....</>
  } else if (error) {
    <>Errorr</>
  }

  console.log(orders)
  return (
    <main className="grid gap-3">
      <div className="flex flex-col lg:justify-between lg:items-center lg:flex-row">
        <label className="text-[2rem] lg:text-[3rem] font-Railway">Placed Orders</label>
      </div>

      <div className="w-full bg-RichBlack h-[1px]" />
      <OrdersTable orders={clothingList} />
    </main>
  )
}
