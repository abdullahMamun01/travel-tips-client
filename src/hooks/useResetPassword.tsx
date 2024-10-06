"use client";
import apiClient from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

type TResetPassPayload = { email: string; newPassword: string };


export default function useResetPassword() {
  const resetPassword = async (payload: TResetPassPayload) => {
    const response = await apiClient.post("/auth/reset-password",payload);
    return response.data;
  };

  return useMutation({
    mutationFn: async (payload:TResetPassPayload) => await resetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
