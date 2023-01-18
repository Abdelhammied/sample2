import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchRequest } from "./types";

const ITEMS_PER_PAGE = import.meta.env.VITE_ITEMS_PER_PAGE;

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
  endpoints: (builder) => ({
    search: builder.query<SearchRequest["response"], SearchRequest["request"]>({
      query: ({ title, page }) =>
        `/search.json?title=${title}&page=${page}&limit=${ITEMS_PER_PAGE}`,
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;
