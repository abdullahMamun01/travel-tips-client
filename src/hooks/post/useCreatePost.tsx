"use client";
import { createPost } from "@/actions/post.action";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useCreatePost() {
  const queryClient = useQueryClient()

  

  return useMutation({
    mutationKey: ["post"] ,
    mutationFn: createPost,

    onSuccess: async() => {
     
      toast.success("Post created suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      console.log(err)
      // toast.error(err.message, { position: "top-right" });
    },
  });
}
