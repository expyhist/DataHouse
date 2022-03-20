import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Base64 } from 'js-base64';

export const apisSlice = createApi({
  reducerPath: 'datahouse',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      const base64Token = Base64.encode(JSON.stringify({ token, email }));
      if (token) {
        headers.set('x-access-token', base64Token);
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
