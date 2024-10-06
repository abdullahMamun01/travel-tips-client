"use client";
import apiClient from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

type TVerifyPayload = { email: string; otp: string };

export default function useVerifyOtp() {
  const verifyOtp = async (payload: TVerifyPayload) => {
    const response = await apiClient.post("/auth/verify-otp", payload);
    return response.data;
  };


  return useMutation({
    mutationFn: async (payload: TVerifyPayload) => await verifyOtp(payload),
    onSuccess: () => {
      toast.success("otp verified", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
