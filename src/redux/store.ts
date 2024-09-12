import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import projectsSliceReducer from "./slices/projects.slice.ts";
import authSliceReducer from "./slices/auth.slice.ts";

export const store = configureStore({
  reducer: {
    projects: projectsSliceReducer,
    auth: authSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
