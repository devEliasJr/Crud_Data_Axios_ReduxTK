import { AxiosError } from "axios";
import { api } from "../hooks/useapi";

const getAllDataService = async () => {
  try {
    const response = await api.get<IDataProps[]>("/products");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

const createUserService = async (userData: any) => {
  const response = await api.post("/products", userData);
  return response.data;
};

const userService = {
  getAllDataService,
  createUserService,
};

export default userService
