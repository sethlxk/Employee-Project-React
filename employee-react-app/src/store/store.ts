import { configureStore } from "@reduxjs/toolkit";
import { EmployeeSlice } from "./features/employeeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PaginationSlice } from "./features/paginationSlice";

export const store = configureStore({
  reducer: {
    EmployeeSlice: EmployeeSlice.reducer,
    PaginationSlice: PaginationSlice.reducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;