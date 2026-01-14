'use client';

import { api } from './api';

export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  message: string;
  email: string;
}

export const newsletterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Newsletter'],
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
