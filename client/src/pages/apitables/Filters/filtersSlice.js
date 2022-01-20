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
      providesTags: (result, error, arg) => [{ type: 'Filter', _id: arg }],
    }),
    addNewFilter: builder.mutation({
      query: (initialFilter) => ({
        url: '/filter',
        method: 'POST',
        body: initialFilter,
      }),
      invalidatesTags: [{ type: 'Filter', operation: 'Add' }],
    }),
    deleteFilter: builder.mutation({
      query(id) {
        return {
          url: `/filter/${id}`,
          method: 'DElETE',
        };
      },
      invalidatesTags: ['Filter'],
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
      invalidatesTags: (result, error, arg) => [{ type: 'Filter', _id: arg.filterId }, 'Menus'],
    }),
  }),
});

export const {
  useGetFilterQuery,
  useAddNewFilterMutation,
  useDeleteFilterMutation,
  useUpdateFilterMutation,
} = filtersSlice;
