import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchTerm: string;
  page: number;
  pageSize: number;
  total: number;
}

export interface FilterParams {
  searchTerm?: string;
  page: number;
  pageSize: number;
}

const initialState: FilterState = {
  searchTerm: '',
  page: 1,
  pageSize: 10,
  total: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 1; // Reset to first page when search changes
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

// Selector to get params for API call
export const selectFilterParams = (state: { filter: FilterState }): FilterParams => ({
  searchTerm: state.filter.searchTerm || undefined,
  page: state.filter.page,
  pageSize: state.filter.pageSize,
});

export const { setSearchTerm, setPage, setTotal } = filterSlice.actions;
export default filterSlice.reducer; 