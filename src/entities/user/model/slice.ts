import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "@/shared/api/user-api";
import { User } from "@/shared/models/model-api";

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[] | null;
  current: User | null;
  token?: string;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
  users: null,
  current: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    resetUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
        state.current = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
        }
      );
  },
});

export const { logout, resetUser } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;

export const selectCurrent = (state: RootState) => state.user.current;

export const selectUsers = (state: RootState) => state.user.users;

export const selectUser = (state: RootState) => state.user.user;
