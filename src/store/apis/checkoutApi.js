import { createApiInstance } from './createApiInstance';

export const checkoutApi = createApiInstance.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (cartItems) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: {
          items: [
            {
              name: 'Cheeseburger',
              price: 15.0, // Price in AUD
              quantity: 2, // Quantity of the item
            },
            {
              name: 'French Fries',
              price: 5.5, // Price in AUD
              quantity: 1, // Quantity of the item
            },
          ],
        },
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = checkoutApi;
