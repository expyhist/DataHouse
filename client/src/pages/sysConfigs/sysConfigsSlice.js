import { apisSlice } from '@/utils/apisSlice';

export const sysConfigsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: (id) => `/menu/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Menu', _id: arg }],
    }),
    addNewMenu: builder.mutation({
      query(data) {
        return {
          url: '/menu',
          method: 'POST',
          body: data,
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
      invalidatesTags: (result, error, arg) => [{ type: 'Menu', _id: arg._id }],
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
    getRoles: builder.query({
      query: () => '/roles',
    }),
    getRole: builder.query({
      query: (id) => `/role/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Role', _id: arg }],
    }),
    addNewRole: builder.mutation({
      query(data) {
        return {
          url: '/role',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Role', operation: 'Add' }],
    }),
    deleteRole: builder.mutation({
      query(id) {
        return {
          url: `/role/${id}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Role', _id: arg._id }],
    }),
    updateRole: builder.mutation({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/role/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Role', _id: arg._id }],
    }),
  }),
});

export const {
  useGetMenuQuery,
  useAddNewMenuMutation,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
  useGetRolesQuery,
  useGetRoleQuery,
  useAddNewRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} = sysConfigsSlice;
