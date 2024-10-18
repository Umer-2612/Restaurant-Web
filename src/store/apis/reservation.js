import { createApiInstance } from './createApiInstance';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query({
      providesTags: ['Reservation'],
      query: (query) => '/reservation',
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
