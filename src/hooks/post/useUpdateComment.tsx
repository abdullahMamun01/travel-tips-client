"use client";

import apiClient from "@/api/axios";
import useAuth from "@/stores/authSore";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

type TPayload = {
  comment: string;
  commentId: string;
  token: string;
};

const updateCommentAction = async (payload: TPayload) => {
  const body = {
    commentId: payload.commentId,
    newComment: payload.comment,
  };
  const response = await apiClient.patch(
    `/comments/${payload.commentId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    }
  );
  return response.data;
};

export default function useUpdateComment() {
  const { auth } = useAuth();
  return useMutation({
    mutationKey: ["comments", auth?.user?._id],
    mutationFn: updateCommentAction,
    onSuccess: async () => {
      toast.success("comment updated suucessfully", { position: "top-right" });
    },
    onError: (err) => {
 
      toast.error(err.message, { position: "top-right" });
    },
  });
}
