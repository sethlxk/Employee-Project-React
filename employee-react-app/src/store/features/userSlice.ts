import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import { BASE_URL_USER } from "../../constants/constants";

interface UserState {
  users: User[];
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  users: [],
  loading: true,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "userSlice/getAllUsers",
  async () => {
    try {
      const response = await axios.get(BASE_URL_USER);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async (user: {
    username: string;
    departmentId: number;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const response = await axios.post(BASE_URL_USER, user);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});
