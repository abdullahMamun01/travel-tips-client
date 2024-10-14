"use client";
import { createPost } from "@/actions/post.action";
import { useSearchStore } from "@/stores/searchStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useCreatePost() {
  const { filters } = useSearchStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["posts"],
    mutationFn: createPost,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", filters || ""],
      });
      toast.success("Post created suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
