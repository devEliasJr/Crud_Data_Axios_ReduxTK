import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from "../Services/userServices";

interface InitialStateProps {
  users: IDataProps[] | [];
  error: string | null;
  success: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: InitialStateProps = {
  users: [],
  error: null,
  success: false,
  loading: false,
  message: null,
};

export const getAllData = createAsyncThunk("users/getAll", async () => {
  const data = await userService.getAllDataService();

  return data;
});

export const getUserById = createAsyncThunk(
  "users/getById",
  async (userId: number) => {
    const data = await userService.getUserByIdService(userId);
    return data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Pick<IDataProps, "name" | "url" | "description">) => {
    const data = await userService.createUserService(userData);
    return data;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, userData }: IDataEditProps) => {
    const data = await userService.editUserService({ userId, userData });
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    const deletedUserId = await userService.deleteUserService(id);
    return deletedUserId;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.users = action.payload || [];
        state.message = "Busca realizada com sucesso";
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        
        const newUserData = action.payload;

        if (newUserData) {
          state.users = [...state.users, newUserData];
        }

        state.message = "Usuario criado com sucesso";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.users = [];
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const updatedUser = action.payload;

        const editedUserIndex = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );

        if (editedUserIndex !== -1) {
          state.users[editedUserIndex] = updatedUser;
        }
        state.message = "Usuario Atualizado com sucesso";
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
        state.users = [];
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.message = "Usuário deletado com sucesso";
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
