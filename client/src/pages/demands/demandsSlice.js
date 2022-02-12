import { apisSlice } from '@/utils/apisSlice';

export const demandsSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDemands: builder.query({
      query: () => '/demands',
      providesTags: ['Demand'],
    }),
    getDemand: builder.query({
      query: (id) => `/demand/${id}`,
      providesTags: ['SingleDemand'],
    }),
    addNewDemand: builder.mutation({
      query(data) {
        return {
          url: '/demand',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Demand'],
    }),
    deleteDemand: builder.mutation({
      query(id) {
        return {
          url: `/demand/${id}`,
          method: 'DELETE',
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
      invalidatesTags: ['SingleDemand'],
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
