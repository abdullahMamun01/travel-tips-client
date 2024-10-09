"use client";

import { unfollowAction } from "@/actions/user.action";


import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useUnfollowAction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unfollowAction,
    onMutate: () => {},
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Unfollow suucessfully", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
