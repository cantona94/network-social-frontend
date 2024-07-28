import { api } from "@/shared/api/base";
import type { Action, Store, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import user from "@/entities/user/model/slice";
import { listenerMiddleware } from "@/shared/middleware/auth";

export const store: Store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
