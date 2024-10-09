"use server";

import apiClient from "@/api/axios";
import { TAxiosResponse } from "@/services/service.type";

type TPaymentPaylodAction = {
  token: string;
  profileName: string;
  price: number;
  subscriptionType: string;
};

type TPaymentResponse = {
  sessionId: string;
  sessionUrl: string;
};

export const paymentCheckoutAction = async (
  payload: TPaymentPaylodAction
): Promise<TAxiosResponse<TPaymentResponse>> => {
  const { token, ...body } = payload;
  const response = await apiClient.post(`/payment/stripe-checkout`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
