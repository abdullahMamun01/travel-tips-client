"use client";

import apiClient from "@/api/axios";
import { TUser } from "@/services/types/user.type";
import useAuth from "@/stores/authSore";
import { TComment } from "@/types/comment.type";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

type TCommentPayload = {
  comment: string;
  postId: string;
  token: string;
};

const commentAction = async (payload: TCommentPayload) => {
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
  const queryClient = useQueryClient();

  const { auth } = useAuth();
  return useMutation({
    mutationKey: ["comments", auth?.user?._id],
    mutationFn: commentAction,
    onMutate: (variable) => {

      queryClient.setQueryData<
        | {
            data: TComment[];
            message: string;
            statusCode: number;
            success: boolean;
          }
        | undefined
      >(["comments"], (oldItems) => {
        if (!oldItems) return;
        console.log(oldItems);
        return {
          ...oldItems,
          data: [
            {
              _id: crypto.randomUUID(),
              post: variable.postId,
              comment: variable.comment,
              replies: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              user: auth?.user as TUser,
            },
            ...oldItems.data,
          ],
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      toast.success("comment suucessfully", { position: "top-right" });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}

/* 

type TComment = {

 
    replies: Reply[] | [];
}
*/
