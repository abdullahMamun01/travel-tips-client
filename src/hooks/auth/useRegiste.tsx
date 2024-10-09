"use client";
import apiClient from "@/api/axios";
import { TRegisterFormFields } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";


export default function useRegister() {
  const router = useRouter();
  const resetPassword = async (payload: TRegisterFormFields ) => {
    const response = await apiClient.post("/users/signup", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: resetPassword,

    onSuccess: () => {
      toast.success("Register account suucessfully", { position: "top-right" });
      router.push("/login");
      router.refresh();
    },
    onError: (err) => {
 
      toast.error(err.message, { position: "top-right" });
    },
  });
}
