"use client";
import { voteAction } from "@/actions/vote.action";
import { useSearchStore } from "@/stores/searchStore";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useVote() {
  const { filters } = useSearchStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: voteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey : ['posts' ,filters]
      })
      toast.success("Upvted post", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
