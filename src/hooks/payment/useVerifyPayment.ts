"use client";


import { VerifiedProfileAndPayment } from "@/services/verified.service";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useVerifyPayment() {
  return useMutation({
    mutationFn: VerifiedProfileAndPayment,

    onSuccess: async () => {
      toast.success("Payment Verified success...", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
