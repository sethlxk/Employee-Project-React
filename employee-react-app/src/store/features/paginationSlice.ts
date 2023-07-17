import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
};

export const setCurrentPage = (
  state: PaginationState,
  action: PayloadAction<{ currentPage: number }>
) => {
  state.currentPage = action.payload.currentPage;
};

export const PaginationSlice = createSlice({
  name: "Pagination",
  initialState,
  reducers: {
    setCurrentPage,
  },
});

export const paginationActions = PaginationSlice.actions;
