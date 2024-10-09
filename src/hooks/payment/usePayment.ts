"use client";

import { paymentCheckoutAction } from "@/actions/payment.action";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function usePayment() {
  return useMutation({
    mutationFn: paymentCheckoutAction,

    onSuccess: async () => {
      toast.success("Payment Checkout success...", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
