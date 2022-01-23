import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from 'config';

export const apisSlice = createApi({
  reducerPath: 'datahouse',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
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
      query: (type) => `/menus/${type}`,
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
          url: '/menus/siderMenusByAccess',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenusByAccessMutation,
} = apisSlice;
