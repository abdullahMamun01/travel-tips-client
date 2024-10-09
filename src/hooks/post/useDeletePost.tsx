"use client";


import { deletPostAction } from "@/actions/post.action";
import useAuth from "@/stores/authSore";
import { useMutation } from "@tanstack/react-query";



import toast from "react-hot-toast";

export default function useDeletePost() {
  const { auth } = useAuth();
  return useMutation({
    mutationKey: ["post", auth?.user?._id],
    mutationFn: deletPostAction,

    onSuccess:  () => {
      toast.success("Post deleted suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
