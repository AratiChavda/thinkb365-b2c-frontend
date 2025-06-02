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
    },
    setToken: (state, action) => {
      console.log("setToken", action.payload);
      localStorage.setItem("access_token", action.payload);
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
