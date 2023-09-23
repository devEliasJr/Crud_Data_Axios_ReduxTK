import { AxiosError } from "axios";
import { api } from "../hooks/useapi";

export const getAllDataService = async () => {
  try {
    const response = await api.get<IDataProps[]>("/products");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

export const createUserService = async (userData: any) => {
  const response = await api.post("/products", userData);
  return response.data;
};
