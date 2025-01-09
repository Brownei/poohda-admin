import { api } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"


async function getAllCategories() {
  const { data } = await api.get(`/categories`)
  return data
}

export const useAllCategories = () => useQuery({
  queryKey: ['all-categories'],
  queryFn: getAllCategories,
  onSuccess({ data }) {
    console.log(data)
  }
})

