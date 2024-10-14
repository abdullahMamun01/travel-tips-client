"use client";

import {toggleBlockkAction } from "@/actions/admin.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useToggledBlock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleBlockkAction,
    onSuccess: (data) => {

      queryClient.invalidateQueries({queryKey: ["admin-users"]})
      toast.success(`User role update to ${data?.data.isBlocked ? 'block' : 'unblock'} successfully`, {
        position: "top-right",
      });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
