import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/utils"


async function getAllCategories() {
  const { data } = await api.get(`/categories`)
  return data
}

export const useAllCategories = () => useQuery({
  queryKey: ['all-categories'],
  queryFn: getAllCategories,
})

