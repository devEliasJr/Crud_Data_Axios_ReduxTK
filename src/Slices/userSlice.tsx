import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from "../Services/userServices";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const getAllData = createAsyncThunk(
  "user/get",
  async () => {
    try {
      const data = await userService.getAllDataService();
      return data;
    } catch (error) {
      throw error
    }
  }
);

export const userSlice = createSlice({
  name: "user",
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
        state.error = false;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
  },
});


export const {resetMessage} = userSlice.actions
export default userSlice.reducer