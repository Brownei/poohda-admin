import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/utils"


async function getAllClothes() {
  const { data } = await api.get(`/clothes`)
  return data
}

export const useAllClothes = () => useQuery({
  queryKey: ['all-clothes'],
  queryFn: getAllClothes,
})


