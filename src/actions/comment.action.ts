"use server";

import apiClient from "@/api/axios";
import { getCurrentUser } from "./auth.action";

const deletCommentAction = async ({
  token,
  commentId,
}: {
  token: string;
  commentId: string;
}) => {
  const response = await apiClient.delete(`/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const replyAction = async (payload: {
  reply: string;
  commentId: string;
}) => {
  const currentUser = await getCurrentUser();
  const response = await apiClient.post(
    `/comments/${payload.commentId}/reply`,
    {
      reply: payload.reply,
    },
    {
      headers: {
        Authorization: `Bearer ${currentUser?.token}`,
      },
    }
  );
  return response.data;
};

export { deletCommentAction };
