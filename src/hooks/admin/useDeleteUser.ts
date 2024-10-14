"use client";

import { deleteUserAction } from "@/actions/admin.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {

      queryClient.invalidateQueries({queryKey: ["admin-users"]})
      toast.success(`User block/unblock by admin successfully`, {
        position: "top-right",
      });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
