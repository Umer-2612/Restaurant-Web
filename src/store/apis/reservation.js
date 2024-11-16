import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';
import { getSocketInstance } from 'utils/socketUtils';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllReservation: build.query({
      providesTags: ['Reservation'],
      query: (query) => `/reservation${queryParamsBuilder(query)}`,
      async onCacheEntryAdded(
        args,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const socket = getSocketInstance();

          if (socket) {
            const listener = (data) => {
              updateCachedData((draft) => {
                draft.data.unshift(data);
              });
            };

            socket.on('reservationRequest', listener);

            await cacheEntryRemoved;
            socket.off('reservationRequest', listener);
          }
        } catch (err) {
          console.error('Error in onCacheEntryAdded:', err);
        }
      },
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
