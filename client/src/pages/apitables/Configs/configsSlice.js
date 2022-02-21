import { apisSlice } from '@/utils/apisSlice';

export const configsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfigs: builder.query({
      query: () => '/apitables',
      providesTags: ['Config', 'SingleFilter'],
    }),
    getConfig: builder.query({
      query: (id) => `/apitable/${id}`,
      providesTags: ['SingleConfig'],
    }),
    addNewConfig: builder.mutation({
      query(data) {
        return {
          url: '/apitable',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Config'],
    }),
    deleteConfig: builder.mutation({
      query(id) {
        return {
          url: `/apitable/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Config'],
    }),
    updateConfig: builder.mutation({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/apitable/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Config', 'SingleConfig'],
    }),
  }),
});

export const {
  useGetConfigsQuery,
  useGetConfigQuery,
  useAddNewConfigMutation,
  useDeleteConfigMutation,
  useUpdateConfigMutation,
} = configsSlice;
