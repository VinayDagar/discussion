// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { IUserInstance } from "../model/user.model";
// import type { Post } from "./types";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getPost: build.query<IUserInstance, number>({
      query: (id) => ({ url: `post/${id}` }),
      transformResponse: (response: { data: IUserInstance }, _meta, _arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      providesTags: (result, error, id) => [{ type: "User", id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      // async onQueryStarted(
      //   arg,
      //   {
      //     dispatch,
      //     getState,
      //     extra,
      //     requestId,
      //     queryFulfilled,
      //     getCacheEntry,
      //     updateCachedData,
      //   }
      // ) {},
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      // async onCacheEntryAdded(
      //   arg,
      //   {
      //     dispatch,
      //     getState,
      //     extra,
      //     requestId,
      //     cacheEntryRemoved,
      //     cacheDataLoaded,
      //     getCacheEntry,
      //     updateCachedData,
      //   }
      // ) {},
    }),
  }),
});
