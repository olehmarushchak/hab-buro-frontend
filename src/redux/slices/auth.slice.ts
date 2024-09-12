/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";

export interface authState {
  isAuthenticated: boolean;
}

const initialState: authState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setLoginAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
