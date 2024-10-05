import { createApiInstance } from './createApiInstance';

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    // signIn: build.mutation({
    //   query({ email, password }) {
    //     const token = email + ':' + password;
    //     return {
    //       url: '/auth/sign-in/',
    //       method: 'GET',
    //       headers: {
    //         authorization: `Basic ${btoa(token)}`,
    //       },
    //     };
    //   },
    //   transformResponse: (res) => {
    //     return res.data;
    //   },
    // }),
    signIn: build.mutation({
      query(query) {
        return {
          url: '/auth/sign-in/',
          method: 'POST',
          body: query,
        };
      },
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getUserInfo: build.query({
      query: () => '/user/info',
      transformResponse: (res) => {
        return res.data;
      },
      providesTags: ['UserAPI'],
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation, useLazyGetUserInfoQuery } = extendedApi;
