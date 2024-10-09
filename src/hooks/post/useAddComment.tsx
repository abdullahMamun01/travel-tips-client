"use client";

import apiClient from "@/api/axios";
import useAuth from "@/stores/authSore";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

type TPayload = {
  comment: string;
  postId: string;
  token: string;
};

const commentAction = async (payload: TPayload) => {
  const response = await apiClient.post(
    `/posts/${payload.postId}/comments`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    }
  );
  return response.data;
};

export default function useAddComment() {
  const { auth } = useAuth();
  return useMutation({
    mutationKey: ["comments", auth?.user?._id],
    mutationFn: commentAction,
    onMutate: () => {},
    onSuccess: async () => {
      toast.success("comment suucessfully", { position: "top-right" });
    },
    onError: (err) => {
  
      toast.error(err.message, { position: "top-right" });
    },
  });
}
