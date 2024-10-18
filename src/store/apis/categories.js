import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: (query) => `/category${queryParamsBuilder(query)}`,
    }),
  }),
});
export const { useGetCategoriesQuery } = categoriesApi;
