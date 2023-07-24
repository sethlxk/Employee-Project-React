import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
const BASE_URL = "http://localhost:8000/user";

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

export const getAllUsers = createAsyncThunk("userSlice/getAllUsers", async() => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data
  } catch (error:any) {
    console.log(error)
    return error.response.data
  }
})

export const createUser = createAsyncThunk(
    "userSlice/createUser",
    async (user: {
      username: string;
      departmentId: number;
      password: string;
      confirmPassword: string
    }) => {
      try {
        const response = await axios.post(BASE_URL, user);
        return response.data;
      } catch (error: any) {
        console.log(error);
        return error.response.data;
      }
    }
  );

  // export const getUser = createAsyncThunk("userSlice/getUser", async(user: {username:string, password: string}) => {
  //   try {
  //       const response = await axios.post(`${BASE_URL}/login`, user);
  //       return response.data
  //   } catch (error: any) {
  //       console.log(error)
  //       return error.response.data;
  //   }
  // })

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
        state.error = action.error.message as string
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
        state.error = action.error.message as string
      });
      // builder.addCase(getUser.fulfilled, (state,action) => {
      //   state.users.find((user) => user === action.payload);
      // })
      // builder.addCase(getUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // });
      // builder.addCase(getUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message as string
      // });
    //   builder.addCase(deleteEmployee.fulfilled, (state,action) => {
    //     const deleteEmployeeID = action.payload;
    //     state.employees.filter((employee) => employee.id !== deleteEmployeeID)
    //   })
    //   builder.addCase(deleteEmployee.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   });
    //   builder.addCase(deleteEmployee.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message as string
    //   });
    },
  });
  