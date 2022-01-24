import { apisSlice } from '@/utils/apisSlice';

export const usersSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: (result) => (result?.data.lenght === 0
        ? [...result.data.map(({ _id }) => ({ type: 'User', _id }))]
        : ['User']),
    }),
    login: builder.mutation({
      query(userInfo) {
        return {
          url: '/user/signin',
          method: 'POST',
          body: userInfo,
        };
      },
    }),
    register: builder.mutation({
      query(data) {
        return {
          url: '/user/signup',
          method: 'POST',
          body: data,
        };
      },
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/user/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/user/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'User', _id: arg._id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersSlice;
