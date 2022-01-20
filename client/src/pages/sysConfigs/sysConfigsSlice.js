import { apisSlice } from '@/utils/apisSlice';

export const sysConfigsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: (id) => `/menu/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Menu', _id: arg }],
    }),
    addNewMenu: builder.mutation({
      query(initialMenu) {
        return {
          url: '/menu',
          method: 'POST',
          body: initialMenu,
        };
      },
      invalidatesTags: [{ type: 'Menu', operation: 'Add' }],
    }),
    deleteMenu: builder.mutation({
      query(id) {
        return {
          url: `/menu/${id}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: ['Menu'],
    }),
    updateMenu: builder.mutation({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/menu/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Menu', _id: arg._id }],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenuQuery,
  useAddNewMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
} = sysConfigsSlice;
