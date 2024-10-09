"use client";


import { deletCommentAction } from "@/actions/comment.action";
import useAuth from "@/stores/authSore";
import { useMutation } from "@tanstack/react-query";



import toast from "react-hot-toast";

export default function useDeleteComment() {
  const { auth } = useAuth();
  return useMutation({
    mutationKey: ["comment", auth?.user?._id],
    mutationFn: deletCommentAction,

    onSuccess:  () => {
      toast.success("Comment deleted suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
