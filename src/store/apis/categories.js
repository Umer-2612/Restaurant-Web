import { createApiInstance } from './createApiInstance';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (query) => '/category',
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApi;
