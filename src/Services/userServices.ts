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

export const getUserByIdService = async (id: number) => {
  try {
    const response = await api.get<IDataProps>(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

const createUserService = async (userData: IDataProps) => {
  try {
    const response = await api.post<IDataProps>("/products", userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

const editUserService = async ({ userId, userData }: IDataEditProps) => {
  try {
    const response = await api.put(`/products/${userId}`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

const deleteUserService = async (userId: number) => {
  try {
    await api.delete(`/products/${userId}`);
    return userId;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
};

const userService = {
  getAllDataService,
  getUserByIdService,
  createUserService,
  editUserService,
  deleteUserService,
};

export default userService;
