import { createSlice, nanoid } from '@reduxjs/toolkit';
import { apisSlice } from '@/utils/apisSlice';

const tableContentSlice = createSlice({
  name: 'tableContent',
  initialState: [{ dataSource: null, columns: null }],
  reducers: {
    tableContentAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(dataSource, columns) {
        return {
          payload: {
            id: nanoid(),
            dataSource,
            columns,
          },
        };
      },
    },
  },
});

export const { tableContentAdded } = tableContentSlice.actions;

export default tableContentSlice.reducer;

export const tablesSlice = apisSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTableData: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/apitabledata/${id}`,
          method: 'POST',
          body,
        };
      },
      providesTags: ['ApiTableData'],
    }),
  }),
});

export const {
  useGetTableDataMutation,
} = tablesSlice;
