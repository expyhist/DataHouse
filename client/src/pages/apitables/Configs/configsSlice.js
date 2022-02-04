import { apisSlice } from '@/utils/apisSlice';

export const configsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfigs: builder.query({
      query: () => '/apitables',
      providesTags: (result) => (result?.data.length === 0
        ? [
          ...result.data.map(({ _id }) => ({ type: 'Config', _id })),
          ...[{ type: 'Config', operation: 'Add' }],
        ]
        : ['Config']),
    }),
    getConfig: builder.query({
      query: (id) => `/apitable/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Config', _id: arg }, { type: 'Filter', operation: 'Add' }],
    }),
    addNewConfig: builder.mutation({
      query(data) {
        return {
          url: '/apitable',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Config', operation: 'Add' }],
    }),
    deleteConfig: builder.mutation({
      query(id) {
        return {
          url: `/apitable/${id}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Config', _id: arg }],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Config', _id: arg._id }, 'Menu'],
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
