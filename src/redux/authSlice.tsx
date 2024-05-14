import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: import.meta.env.VITE_EMAIL as string,
  password: import.meta.env.VITE_PASSWORD as string,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
})


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;