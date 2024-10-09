"use client";

import { followUserAction } from "@/actions/user.action";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useFollowAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followUserAction,
    onMutate: () => {},
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Following suucessfully", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
