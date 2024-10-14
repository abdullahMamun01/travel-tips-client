"use client";

import { unfollowAction } from "@/actions/user.action";


import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useUnfollowAction() {

  return useMutation({
    mutationFn: unfollowAction,
    onMutate: () => {},
    onSuccess: async () => {
  
      toast.success("Unfollow suucessfully", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
