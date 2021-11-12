import { apisSlice } from "@/utils/apisSlice";

export const demandsSlice = apisSlice.injectEndpoints({
  endpoints: builder => ({
    getDemands: builder.query({
      query: () => "/demands",
      providesTags: (result, error, arg) => 
        result ? [...result.data.map(({ _id }) => ({ type: "Demand", _id})), "Demand"] : ["Demand"]
    }),
    getDemand: builder.query({
      query: (id) => `/demand/${id}`,
      providesTags: (result, error, arg) => [{ type: "Demand", _id: arg }]
    }),
    addNewDemand: builder.mutation({
      query(initialDemand) {
        return {
          url: "/demand",
          method: "POST",
          body: initialDemand
        }
      },
      invalidatesTags: ["Demand"]
    }),
    deleteDemand: builder.mutation({
      query(id) {
        return {
          url: `/demand/${id}`,
          method: "delete"
        }
      },
      invalidatesTags: ["Demand"]
    }),
    updateDemand: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/demand/${id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Demand", _id: arg.id }]
    })
  })
});

export const { 
  useGetDemandsQuery,
  useGetDemandQuery,
  useAddNewDemandMutation, 
  useDeleteDemandMutation,
  useUpdateDemandMutation
} = demandsSlice;
