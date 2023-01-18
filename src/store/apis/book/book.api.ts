import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DisplayBookInfoRequest } from "./types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL }),
  endpoints: (builder) => ({
    displayBookInfo: builder.query<
      DisplayBookInfoRequest["response"],
      DisplayBookInfoRequest["request"]
    >({
      query: ({ ISBN }) =>
        `/api/books?bibkeys=ISBN:${ISBN}&jscmd=details&format=json`,
      transformResponse(
        response: { [key: string]: DisplayBookInfoRequest["response"] },
        meta,
        args
      ) {
        return response[`ISBN:${args.ISBN}`];
      },
    }),
  }),
});

export const { useDisplayBookInfoQuery, useLazyDisplayBookInfoQuery } = bookApi;
