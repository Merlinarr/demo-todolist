import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    email: string;
    id: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: !!storage.getToken(),
  token: storage.getToken(),
  user: storage.getUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // Save to localStorage
      storage.setToken(action.payload.token);
      storage.setUser(action.payload.user);
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      // Clear localStorage
      storage.clearAuth();
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer; 