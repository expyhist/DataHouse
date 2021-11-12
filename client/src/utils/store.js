import { configureStore } from "@reduxjs/toolkit";

import { apisSlice } from "./apisSlice";
import tableContentSlice from  "@/pages/apitables/Tables/tablesSlice";
import filtersNumSlice from  "@/pages/apitables/Filters/filtersSlice";

export default configureStore({
  reducer: {
    [apisSlice.reducerPath]: apisSlice.reducer,
    tableContent: tableContentSlice,
    filtersNum: filtersNumSlice
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apisSlice.middleware)
})