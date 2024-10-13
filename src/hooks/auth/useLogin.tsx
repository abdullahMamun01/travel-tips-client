/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { loginUser } from "@/actions/auth.action";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";

import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async(userData) => await  loginUser(userData),
    onSuccess: () => {
      toast.success("Loginsuucessfully", { position: "top-right" });
      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
