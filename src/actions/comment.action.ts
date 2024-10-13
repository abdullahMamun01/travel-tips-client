"use server";

import apiClient from "@/api/axios";


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

export { deletCommentAction };
