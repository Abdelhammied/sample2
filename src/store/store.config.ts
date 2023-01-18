import { configureStore } from "@reduxjs/toolkit";

import { bookApi } from "./apis/book/book.api";
import { searchApi } from "./apis/search/search.api";

import reducers from "./reducers";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }).concat([searchApi.middleware, bookApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
