import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/utils"


async function getAllOrders() {
  const { data } = await api.get(`/orders`)
  return data
}

export const useAllOrders = () => useQuery({
  queryKey: ['all-orders'],
  queryFn: getAllOrders,
})



