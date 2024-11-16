import { createApiInstance } from './createApiInstance';

import { queryParamsBuilder } from 'utils/commonFunctions';
import { getSocketInstance } from 'utils/socketUtils';

const categoriesApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (query) => `/orders${queryParamsBuilder(query)}`,
    }),

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

          socket.on('orders', listener);

          await cacheEntryRemoved;
          socket.off('orders', listener);
        }
      } catch (err) {
        console.error('Error in onCacheEntryAdded:', err);
      }
    },
  }),
});
export const { useGetAllOrdersQuery } = categoriesApi;
