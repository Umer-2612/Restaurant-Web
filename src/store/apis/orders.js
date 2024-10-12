import { createApiInstance } from './createApiInstance';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (query) => '/orders',
    }),
  }),
});
export const { useGetAllOrdersQuery } = categoriesApi;
