import { createApiInstance } from './createApiInstance';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query({
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
    }),

    reservationStatusUpdate: build.mutation({
      query({ status, _id }) {
        return {
          url: `/reservation/${_id}`,
          method: 'POST',
          body: { status },
        };
      },
    }),
  }),
});
export const {
  useGetAllReservationQuery,
  usePutPostReservationMutation,
  useReservationStatusUpdateMutation,
} = reservationApi;
