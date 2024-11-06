import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query({
      providesTags: ['Reservation'],
      query: (query) => `/reservation${queryParamsBuilder(query)}`,
    }),

    putPostReservation: build.mutation({
      query(data) {
        return {
          url: '/reservation',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Reservation'],
    }),

    reservationStatusUpdate: build.mutation({
      query({ status, _id }) {
        return {
          url: `/reservation/${_id}`,
          method: 'PATCH',
          body: { status },
        };
      },
      invalidatesTags: ['Reservation'],
    }),
  }),
});
export const {
  useGetAllReservationQuery,
  usePutPostReservationMutation,
  useReservationStatusUpdateMutation,
} = reservationApi;
