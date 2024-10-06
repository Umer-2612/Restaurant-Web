import { createApiInstance } from './createApiInstance';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query({
      query: (query) => '/orders',
    }),
  }),
});
export const { useGetOrdersQuery } = categoriesApi;
