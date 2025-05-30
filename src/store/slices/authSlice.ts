import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setCredentials: (state: any, action) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        role: action.payload.role,
        name: action.payload.name,
      };
      localStorage.setItem("user", JSON.stringify(state.user));
      if (action.payload.access_token) {
        localStorage.setItem("access_token", action.payload.access_token);
        state.accessToken = action.payload.access_token;
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
