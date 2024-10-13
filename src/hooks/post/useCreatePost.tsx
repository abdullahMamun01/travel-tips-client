"use client";
import { createPost } from "@/actions/post.action";
import {  useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useCreatePost() {

  // const queryClient = useQueryClient()


  return useMutation({
    mutationKey: ["posts"] ,
    mutationFn: createPost,

    onSuccess: async() => {
   
      toast.success("Post created suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      
      toast.error(err.message, { position: "top-right" });
    },
  });
}
