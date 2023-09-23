import { useMutation, useQueryClient } from "react-query";
import { createPost, deletePost, updatePost } from "./useFetchData";

export function useCreateUserMutate() {
 const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return mutate;
}

export function useUpdateUserMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ({ userId, data }: IDataEditProps) => updatePost({ userId, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return mutate;
}

export function useDeleteUserMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: ( userId : number) => deletePost( userId ),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return mutate;
}