import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllQueries: build.query({
      providesTags: ['ContactUs'],
      query: (query) => `/contact-us${queryParamsBuilder(query)}`,
    }),

    putPostContactUs: build.mutation({
      query(data) {
        return {
          url: '/contact-us',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['ContactUs'],
    }),
    contactUsStatusUpdate: build.mutation({
      query({ status, _id }) {
        return {
          url: `/contact-us/${_id}`,
          method: 'PATCH',
          body: { status },
        };
      },
      invalidatesTags: ['ContactUs'],
    }),
  }),
});
export const {
  useGetAllQueriesQuery,
  usePutPostContactUsMutation,
  useContactUsStatusUpdateMutation,
} = reservationApi;
