import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (query) => `/orders${queryParamsBuilder(query)}`,
    }),
  }),
});
export const { useGetAllOrdersQuery } = categoriesApi;
