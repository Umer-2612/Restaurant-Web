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
  }),
});
export const { useGetAllReservationQuery, usePutPostReservationMutation } =
  reservationApi;
