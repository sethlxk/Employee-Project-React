import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Department, Employee } from "../../models/employee.model";

const BASE_URL = "http://localhost:8000/employee";

interface EmployeeState {
  employees: Employee[],
  loading: boolean,
  error: null | string
}

const initialState: EmployeeState = {
  employees: [],
  loading: true,
  error: null
};

export const fetchAllEmployees = createAsyncThunk(
  "employeeSlice/fetchAllEmployees",
  async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const createEmployee = createAsyncThunk(
  "employeeSlice/createEmployee",
  async (employee: {
    name: string;
    salary: number;
    department: Department;
  }) => {
    try {
      const response = await axios.post(BASE_URL, employee);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
);
export const editEmployee = createAsyncThunk("employeeSlice/editEmployee", async(employee: {id:number, name:string, salary: number, department: Department}) => {
  try {
    const newEmployee = {name: employee.name, salary: employee.salary, department: employee.department}
    const response = await axios.put(`${BASE_URL}/${employee.id}`, newEmployee)
    return response.data
  } catch (error:any) {
    console.log(error)
    return error.response.data
  }
})
export const deleteEmployee = createAsyncThunk("employeeSlice/deleteEmployee", async(id:number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return response.data
  } catch (error:any) {
    console.log(error)
    return error.response.data;
  }
})

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string
    });
    builder.addCase(editEmployee.fulfilled, (state,action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex((employee) => employee.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    })
    builder.addCase(editEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string
    });
    builder.addCase(deleteEmployee.fulfilled, (state,action) => {
      const deleteEmployeeID = action.payload;
      state.employees.filter((employee) => employee.id !== deleteEmployeeID)
    })
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string
    });
  },
});
