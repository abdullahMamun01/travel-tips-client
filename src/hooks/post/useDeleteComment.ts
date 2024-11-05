"use client";


import { deletCommentAction } from "@/actions/comment.action";
import { TAxiosResponse } from "@/services/service.type";
import useAuth from "@/stores/authSore";
import { TComment } from "@/types/comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";



import toast from "react-hot-toast";

export default function useDeleteComment() {
  const { auth } = useAuth();
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["comment", auth?.user?._id],
    mutationFn: deletCommentAction,
    onMutate: (variable) => {
      queryClient.setQueryData<TAxiosResponse<TComment[]> | undefined>(['comments'] , (oldData) => {
        console.log(variable)
        if(!oldData) return
 
        return {...oldData , data: oldData.data.filter(comment => comment._id != variable.commentId)}
      })
    },
    onSuccess:  () => {
      toast.success("Comment deleted suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
