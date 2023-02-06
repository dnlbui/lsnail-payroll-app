// This is the Redux slice for the TicketList component
// Using this state to pass to ticketform to requery/refetch for a re-render
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  name: "",
};

export const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setStartDate, setEndDate, setName } = ticketListSlice.actions;

export const selectStartDate = (state) => state.ticketList.startDate;
export const selectEndDate = (state) => state.ticketList.endDate;
export const selectName = (state) => state.ticketList.name;

// export const selectTicketList = (state) => state.ticketList;
export default ticketListSlice.reducer;

