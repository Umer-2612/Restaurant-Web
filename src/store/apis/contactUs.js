import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';
import { getSocketInstance } from 'utils/socketUtils';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllQueries: build.query({
      providesTags: ['ContactUs'],
      query: (query) => `/contact-us${queryParamsBuilder(query)}`,
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

            socket.on('contactRequest', listener);

            await cacheEntryRemoved;
            socket.off('contactRequest', listener);
          }
        } catch (err) {
          console.error('Error in onCacheEntryAdded:', err);
        }
      },
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
