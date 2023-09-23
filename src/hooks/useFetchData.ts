import { api } from "./useapi";

export const getAllData = async () => {
  const response = await api.get<IDataProps[]>("/products");

  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await api.get<IDataProps>(`/products/${id}`);

  return response.data;
};

export const createPost = async (
  userData: Pick<IDataProps, "name" | "url">
) => {
  const response = await api.post("/products", userData);

  return response.data;
};

export const updatePost = async ({ userId, data }: IDataEditProps) => {
  const response = await api.put(`/products/${userId}`, data);

  return response.data;
};

export const deletePost = async (userId: number) => {
  const response = await api.delete(`/products/${userId}`);

  return response.data;
};