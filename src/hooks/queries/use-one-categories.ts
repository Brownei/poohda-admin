import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/utils"

async function getOneCategory(id: number) {
  const { data } = await api.get(`/categories/${id}`)
  return data
}


export const useOneCategories = (id: number) => useQuery({
  queryKey: ['all-categories', id],
  queryFn: () => getOneCategory(id)
})
