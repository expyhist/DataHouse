import { apisSlice } from "@/utils/apisSlice";

export const usersSlice = apisSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => "/users"
    }),
    login: builder.mutation({
      query(userInfo) {
        return {
          url: "/user/signin",
          method: "POST",
          body: userInfo
        }
      }
    }),
    register: builder.mutation({
      query(initialUser) {
        return {
          url: "/user/signup",
          method: "POST",
          body: initialUser
        }
      }
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/user/${id}`,
          method: "DELETE"
        }
      }
    }),
    updateUser: builder.mutation({
      query(data) {
        const {_id, ...body} = data;
        return {
          url: `/user/${_id}`,
          method: "PUT",
          body
        }
      }
    })
  })
});

export const { 
  useGetUsersQuery,
  useLoginMutation,
  useRegisterMutation, 
  useDeleteUserMutation,
  useUpdateUserMutation
} = usersSlice;
