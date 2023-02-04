import { createSlice } from '@reduxjs/toolkit';

// Initial state of the slice
const initialState = {
  startDate: null,
  endDate: null,
  name: null,
}

// Slice contains reducer and actions
export const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setDates: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setName: (state, action) => {
      state.name = action.payload.name;
    },
  },
}); 

// Action creators are generated for each case reducer function
export const { setDates, setName } = searchBarSlice.actions;  

// Selectors
export const selectStartDate = (state) => state.searchBar.startDate;
export const selectEndDate = (state) => state.searchBar.endDate;
export const selectName = (state) => state.searchBar.name;

// Reducer
export default searchBarSlice.reducer;