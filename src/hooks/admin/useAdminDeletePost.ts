"use client";

import { deletePostAction } from "@/actions/admin.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useAdminDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostAction,
    onSuccess: (data) => {
        console.log(data)
      queryClient.invalidateQueries({queryKey: ["admin-posts"]})
      toast.success(`User post delete by admin successfully`, {
        position: "top-right",
      });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
