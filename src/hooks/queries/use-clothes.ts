import { api } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"


async function getAllClothes() {
  const { data } = await api.get(`/clothes`)
  return data
}

export const useAllClothes = () => useQuery({
  queryKey: ['all-clothes'],
  queryFn: getAllClothes,
  onSuccess({ data }) {
    console.log(data)
  }
})


