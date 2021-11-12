import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apisSlice = createApi({
  reducerPath: "datahouse",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Config", "Filter", "Demand", "Menu"],
  endpoints: builder => ({
    getMenus: builder.query({
      query: (type) => `/menus/${type}`,
      providesTags: (result, error, arg) => 
        result ? [...result.data.map(({ _id }) => ({ type: "Menu", _id})), "Menu"] : ["Menu"]
    })
  })
});


export const { 
  useGetMenusQuery
} = apisSlice;