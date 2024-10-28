import { createApiInstance } from './createApiInstance';

export const checkoutApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (cartItems) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: { cartItems },
      }),
    }),
    createCodOrder: builder.mutation({
      query: (payload) => ({
        url: '/stripe/create-cod-order',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useCreateCodOrderMutation } =
  checkoutApi;
