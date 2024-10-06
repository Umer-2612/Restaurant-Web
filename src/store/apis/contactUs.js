import { createApiInstance } from './createApiInstance';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllQueries: build.query({
      query: (query) => '/contact-us',
    }),

    putPostContactUs: build.mutation({
      query(data) {
        return {
          url: '/contact-us',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});
export const { useGetAllQueriesQuery, usePutPostContactUsMutation } =
  reservationApi;
