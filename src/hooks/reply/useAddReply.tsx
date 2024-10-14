"use client";

import { replyAction } from "@/actions/comment.action";


import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useAddReply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: replyAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("reply suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
