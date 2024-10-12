import { createApiInstance } from './createApiInstance';

export const checkoutApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (items) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: { items },
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = checkoutApi;
