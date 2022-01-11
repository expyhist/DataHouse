import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from 'config';

export const apisSlice = createApi({
  reducerPath: 'datahouse',
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  tagTypes: ['Config', 'Filter', 'Demand', 'Menu'],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: (type) => `/menus/${type}`,
      providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: 'Menu', _id })), 'Menu'] : ['Menu']),
    }),
  }),
});

export const {
  useGetMenusQuery,
} = apisSlice;
