import { apisSlice } from "@/utils/apisSlice";
import { createSlice, nanoid } from "@reduxjs/toolkit";


export const filtersNumSlice = createSlice({
  name: "filtersNum",
  initialState: [{rangeDate: 0, singleDate: 0, text: 0, enum: 0}],
  reducers: {
    filtersNumAdded: {
      reducer(state, action) {
        state.push(action.payload)
      }
    }
  },
});

export const { filtersNumAdded } = filtersNumSlice.actions

export default filtersNumSlice.reducer;

export const filtersSlice = apisSlice.injectEndpoints({
  endpoints: builder => ({
    getFilters: builder.query({
      query: () => "/filters",
      providesTags: (result, error, arg) => 
        result ? [...result.data.map(({ _id }) => ({ type: "Filter", _id})), "Filter"] : ["Filter"]
    }),
    getFilter: builder.query({
      query: (id) => `/filter/${id}`,
      providesTags: (result, error, arg) => [{ type: "Filter", _id: arg }]
    }),
    addNewFilter: builder.mutation({
      query: initialFilter => ({
        url: "/filter",
        method: "POST",
        body: initialFilter
      }),
      invalidatesTags: ["Config", "Filter"]
    }),
    deleteFilter: builder.mutation({
      query(id) {
        return {
          url: `/filter/${id}`,
          method: "delete"
        }
      },
      invalidatesTags: ["Filter"]
    }),
    updateFilter: builder.mutation({
      query(data) {
        const {id, ...body} = data;
        return {
          url: `/filter/${id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Filter", _id: arg.id }]
    })
  })
});

export const { 
  useGetFiltersQuery,
  useGetFilterQuery,
  useAddNewFilterMutation, 
  useDeleteFilterMutation,
  useUpdateFilterMutation
} = filtersSlice;
