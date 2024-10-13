
import apiClient from "@/api/axios";

export const getEligibility = async (token: string) => {
  const response = await apiClient.get(`/users/profile/verify-eligibility`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
///payment/confirm-payment

export const VerifiedProfileAndPayment = async (payload :  {token:string ,session_id: string} ) => {
  const {token ,session_id} = payload

  const response = await apiClient.post(
    `/payment/confirm-payment`,
    {
      session_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
