import { apisSlice } from '@/utils/apisSlice';

export const demandsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDemands: builder.query({
      query: () => '/demands',
      providesTags: (result) => (result?.data.lenght === 0
        ? [...result.data.map(({ _id }) => ({ type: 'Demand', _id })), ...[{ type: 'Demand', operation: 'Add' }]]
        : ['Demand']),
    }),
    getDemand: builder.query({
      query: (id) => `/demand/${id}`,
      providesTags: (result, error, arg) => [{ type: 'Demand', _id: arg }],
    }),
    addNewDemand: builder.mutation({
      query(data) {
        return {
          url: '/demand',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Demand', operation: 'Add' }],
    }),
    deleteDemand: builder.mutation({
      query(id) {
        return {
          url: `/demand/${id}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: ['Demand'],
    }),
    updateDemand: builder.mutation({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `/demand/${_id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Demand', _id: arg._id }],
    }),
  }),
});

export const {
  useGetDemandsQuery,
  useGetDemandQuery,
  useAddNewDemandMutation,
  useDeleteDemandMutation,
  useUpdateDemandMutation,
} = demandsSlice;
