import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalPages: number
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1
};

export const setCurrentPage = (
  state: PaginationState,
  action: PayloadAction<{ currentPage: number }>
) => {
  state.currentPage = action.payload.currentPage;
};

export const setToMaxPage = (state:PaginationState) => {
  state.currentPage = state.totalPages;
}
export const setTotalPage = (state:PaginationState, action: PayloadAction<{totalPages: number}>) => {
  state.totalPages = action.payload.totalPages;
}
export const PaginationSlice = createSlice({
  name: "Pagination",
  initialState,
  reducers: {
    setCurrentPage,
    setToMaxPage,
    setTotalPage
  },
});

export const paginationActions = PaginationSlice.actions;
