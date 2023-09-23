import { useQuery } from "react-query";
import { getAllData, getUserById } from "./useFetchData";


export function useGetAllUsersQuery () {
  const query = useQuery<IDataProps[], Error>({
    queryFn: getAllData,
    queryKey: ["users"],
    retry: false,
    refetchInterval: false
  })

  return query 
}

export function useGetUserById (id: number) {
  const query = useQuery<IDataProps, Error>({
    queryFn: () => getUserById(id),
    queryKey: ["user"],
    retry: false,
    refetchInterval: false,
    enabled: !!id
  })

  return query 
}