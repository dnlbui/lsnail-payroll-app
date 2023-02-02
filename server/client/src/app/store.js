import { configureStore } from '@reduxjs/toolkit';
import {emloyeesApiSlice} from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emloyeesApiSlice.middleware),
});
