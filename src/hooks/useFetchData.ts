import { api } from "./useapi";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

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

export const updatePost = async ({ userId, userData }: IDataEditProps) => {
  const response = await api.put(`/products/${userId}`, userData);

  return response.data;
};

export const deletePost = async (userId: number) => {
  const response = await api.delete(`/products/${userId}`);

  return response.data;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
