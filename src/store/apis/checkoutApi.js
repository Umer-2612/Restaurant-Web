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
  }),
});

export const { useCreateCheckoutSessionMutation } = checkoutApi;
