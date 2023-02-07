import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import ticketListReducer from '../features/tickets/TicketListSlice';

// Configure the store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    ticketList: ticketListReducer,
  },
  //added serializableCheck: false to get rid of error message
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false,}).concat(apiSlice.middleware),
  devTools: true //turn off during PRODUCTION RUN
});
