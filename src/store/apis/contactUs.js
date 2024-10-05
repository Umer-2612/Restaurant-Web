import { createApiInstance } from './createApiInstance';

const reservationApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    putPostContactUs: build.mutation({
      query(data) {
        return {
          url: '/contact-us',
          method: 'POST',
          body: data,
        };
      },
      //   transformResponse: (res) => {
      //     return res.data;
      //   },
    }),
    // putPostMenu: build.mutation({
    //   query(body) {
    //     const filteredData = removeExtraFields(body);
    //     return {
    //       url: '/menu' + (body._id ? `/${body._id}` : ''),
    //       method: body._id ? 'PUT' : 'POST',
    //       body: filteredData,
    //     };
    //   },
    //   //   transformResponse: (res) => {
    //   //     return res.data;
    //   //   },
    // }),
    // deleteMenu: build.mutation({
    //   query(id) {
    //     return { url: `/menu/${id}`, method: 'DELETE' };
    //   },
    //   //   transformResponse: (res) => {
    //   //     return res.data;
    //   //   },
    // }),
  }),
});
export const { usePutPostContactUsMutation } = reservationApi;
