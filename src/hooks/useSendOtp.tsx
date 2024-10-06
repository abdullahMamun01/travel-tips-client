"use client";
import apiClient from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useSendOtp() {
  const sendOtp = async (email: string) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
  };

  return useMutation({
    mutationFn: async (email: string) => await sendOtp(email),
    onSuccess: () => {
      toast.success("Ot sent to the email", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
