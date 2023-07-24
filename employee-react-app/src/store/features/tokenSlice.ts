import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8000/user/login";

interface TokenState {
  token: string | null;
  loading: boolean;
  error: null | string;
}

const initialState: TokenState = {
  token: null,
  loading: true,
  error: null,
};

export const getToken = createAsyncThunk(
  "tokenSlice/getToken",
  async (user: { username: string; password: string }) => {
    try {
      const response = await axios.post(BASE_URL, user);
      localStorage.setItem("token", response.data)
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});