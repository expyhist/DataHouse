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
  tagTypes: ['Config', 'Filter', 'Demand', 'Menu', 'User', 'Role'],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: () => '/menus',
      providesTags: ['Menu', 'Config'],
    }),
    getMenusByTree: builder.query({
      query: () => '/menus/tree',
      providesTags: ['MenuTree'],
    }),
    getMenusByAccess: builder.query({
      query: (access) => `/menus/${access}`,
      providesTags: ['SiderMenu'],
    }),
    getAuths: builder.query({
      query: (role) => `/auths/${role}`,
      providesTags: ['Auth'],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenusByTreeQuery,
  useGetMenusByAccessQuery,
  useGetAuthsQuery,
} = apisSlice;
