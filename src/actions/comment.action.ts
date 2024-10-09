"use server";

import apiClient from "@/api/axios";
import { revalidatePath } from "next/cache";

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
  revalidatePath(`/post/${commentId}`);
  return response.data;
};

export { deletCommentAction };
