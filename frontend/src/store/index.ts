import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import filterReducer from './filter/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 