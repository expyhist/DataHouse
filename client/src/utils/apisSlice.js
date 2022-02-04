import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apisSlice = createApi({
  reducerPath: 'datahouse',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('x-access-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Config', 'Filter', 'Demand', 'Menu', 'User'],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => '/menus',
      providesTags: (result) => (result?.data.length === 0
        ? [
          ...result.data.map(({ _id }) => ({ type: 'Menu', _id })),
          ...[{ type: 'Menu', operation: 'Add' }, { type: 'Config', operation: 'Add' }],
        ]
        : ['Menu']),
    }),
    getMenusByTree: builder.query({
      query: () => '/menus/tree',
      providesTags: (result) => (result?.data.length === 0
        ? [
          ...result.data.map(({ _id }) => ({ type: 'Menu', _id })),
          ...[{ type: 'Menu', operation: 'Add' }],
        ]
        : ['Menu']),
    }),
    getMenusByAccess: builder.mutation({
      query(data) {
        return {
          url: '/menus/access',
          method: 'POST',
          body: data,
        };
      },
    }),
    getAuthsById: builder.mutation({
      query(data) {
        return {
          url: '/authsbyid',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenusByTreeQuery,
  useGetMenusByAccessMutation,
  useGetAuthsByIdMutation,
} = apisSlice;
