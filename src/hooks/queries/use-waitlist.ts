import { useQuery } from "@tanstack/react-query"
import { api } from "../../lib/utils"


async function getAllWaitlist() {
  const { data } = await api.get(`/waitlist`)
  return data
}

export const useAllWaitlist = () => useQuery({
  queryKey: ['all-waitlist'],
  queryFn: getAllWaitlist,
})


