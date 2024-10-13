"use client";
import apiClient from "@/api/axios";
import useAuth from "@/stores/authSore";
import { usePostStore } from "@/stores/postStore";

import { QueryClient, useMutation } from "@tanstack/react-query";


import toast from "react-hot-toast";

const updatePostAction = async (payload: FormData ,token:string,postId:string ) => {
  const response = await apiClient.patch(`/posts/${postId}`,payload , {
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'

      },
  });

  return response.data
};

type PostUpdate ={
    body:FormData ,
    postId:string
}

export default function useUpdatePost() {
  const { updatePost } = usePostStore();
    const {auth} = useAuth()
    const queryClient = new QueryClient()
  return useMutation({
    mutationKey: ["post", updatePost?.postId],
    mutationFn: async(payload:PostUpdate) => await updatePostAction(payload.body , auth?.token as string , payload.postId),

    onSuccess: async () => {
        queryClient.invalidateQueries()
      toast.success("Post created suucessfully", { position: "top-right" });
    },
    onError: (err) => {

      toast.error(err.message, { position: "top-right" });
    },
  });
}
