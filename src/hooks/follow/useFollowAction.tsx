"use client";

import { followUserAction } from "@/actions/user.action";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useFollowAction() {


  return useMutation({
    mutationFn: followUserAction,
    onMutate: () => {},
    onSuccess: async () => {
     
      toast.success("Following suucessfully", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
