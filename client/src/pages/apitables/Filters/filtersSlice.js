import { createSlice } from '@reduxjs/toolkit';
import { apisSlice } from '@/utils/apisSlice';

const filtersNumSlice = createSlice({
  name: 'filtersNum',
  initialState: [{
    rangeDate: 0, singleDate: 0, text: 0, enum: 0,
  }],
  reducers: {
    filtersNumAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
    },
  },
});

export const { filtersNumAdded } = filtersNumSlice.actions;

export default filtersNumSlice.reducer;

export const filtersSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFilter: builder.query({
      query: (id) => `/filter/${id}`,
      providesTags: ['SingleFilter'],
    }),
    addNewFilter: builder.mutation({
      query: (data) => ({
        url: '/filter',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SingleFilter'],
    }),
    deleteFilter: builder.mutation({
      query(id) {
        return {
          url: `/filter/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['SingleFilter'],
    }),
    updateFilter: builder.mutation({
      query(data) {
        const { filterId, ...body } = data;
        return {
          url: `/filter/${filterId}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['SingleFilter'],
    }),
  }),
});

export const {
  useGetFilterQuery,
  useAddNewFilterMutation,
  useDeleteFilterMutation,
  useUpdateFilterMutation,
} = filtersSlice;
