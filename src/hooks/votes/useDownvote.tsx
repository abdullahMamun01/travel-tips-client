"use client";
import { voteAction } from "@/actions/vote.action";

import {

  useMutation,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useVote() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: voteAction,
    onSuccess: () => {
      
        // queryClient.invalidateQueries(["posts"])
      toast.success("Upvted post", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
