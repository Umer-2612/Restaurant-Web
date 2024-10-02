import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder, removeExtraFields } from 'utils/commonFunctions';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query({
      query: (query) => `/menu${queryParamsBuilder(query)}`,
      //   transformResponse: (res) => {
      //     return res.data;
      //   },
    }),
    putPostMenu: build.mutation({
      query(body) {
        const filteredData = removeExtraFields(body);
        return {
          url: '/menu' + (body._id ? `/${body._id}` : ''),
          method: body._id ? 'PUT' : 'POST',
          body: filteredData,
        };
      },
      //   transformResponse: (res) => {
      //     return res.data;
      //   },
    }),
    deleteMenu: build.mutation({
      query(id) {
        return { url: `/menu/${id}`, method: 'DELETE' };
      },
      //   transformResponse: (res) => {
      //     return res.data;
      //   },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMenusQuery,
  usePutPostMenuMutation,
  useDeleteMenuMutation,
} = extendedApi;
