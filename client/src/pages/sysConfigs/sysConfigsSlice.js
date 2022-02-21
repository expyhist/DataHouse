import { apisSlice } from '@/utils/apisSlice';

export const sysConfigsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: (id) => `/menu/${id}`,
      providesTags: ['SingleMenu'],
    }),
    addNewMenu: builder.mutation({
      query(data) {
        return {
          url: '/menu',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Menu', 'MenuTree'],
    }),
    deleteMenu: builder.mutation({
      query(id) {
        return {
          url: `/menu/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Menu', 'MenuTree'],
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
      invalidatesTags: ['Menu', 'MenuTree'],
    }),

    getRoles: builder.query({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    getRole: builder.query({
      query: (id) => `/role/${id}`,
      providesTags: ['SingleRole'],
    }),
    addNewRole: builder.mutation({
      query(data) {
        return {
          url: '/role',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Role'],
    }),
    deleteRole: builder.mutation({
      query(id) {
        return {
          url: `/role/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Role'],
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
      invalidatesTags: ['Role'],
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
