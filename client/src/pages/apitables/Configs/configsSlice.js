import { apisSlice } from "@/utils/apisSlice";

export const configsSlice = apisSlice.injectEndpoints({
  endpoints: builder => ({
    getConfigs: builder.query({
      query: () => "/apitables",
      providesTags: (result, error, arg) => 
        result ? [...result.data.map(({ _id }) => ({ type: "Config", _id})), "Config"] : ["Config"]
    }),
    getConfig: builder.query({
      query: (id) => `/apitable/${id}`,
      providesTags: (result, error, arg) => [{ type: "Config", _id: arg }]
    }),
    addNewConfig: builder.mutation({
      query(initialConfig) {
        return {
          url: "/apitable",
          method: "POST",
          body: initialConfig
        }
      },
      invalidatesTags: ["Config"]
    }),
    deleteConfig: builder.mutation({
      query(id) {
        return {
          url: `/apitable/${id}`,
          method: "delete"
        }
      },
      invalidatesTags: ["Config", "Menu"]
    }),
    updateConfig: builder.mutation({
      query(data) {
        const {_id, ...body} = data;
        return {
          url: `/apitable/${_id}`,
          method: "PUT",
          body
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Config", _id: arg.id }, "Menu"]
    })
  })
});

export const { 
  useGetConfigsQuery,
  useGetConfigQuery,
  useAddNewConfigMutation, 
  useDeleteConfigMutation,
  useUpdateConfigMutation
} = configsSlice;
