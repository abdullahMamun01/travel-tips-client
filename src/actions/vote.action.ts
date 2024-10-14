"use server";
import apiClient from "@/api/axios";
import { TAxiosResponse } from "@/services/service.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type TVote = {
  postId: string;
  voteType: "upvote" | "downvote";
};

const voteAction = async (payload: TVote) => {
  const token = cookies().get("accessToken");
  const response = await apiClient.patch(
    `/posts/${payload.postId}/${payload.voteType}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
    revalidatePath("/");

  return response.data;
};

const hasPostVoteAction = async (
  postId: string
): Promise<
  TAxiosResponse<{
    hasVoted: boolean;
    voteType: string | null;
  }>
> => {
  const token = cookies().get("accessToken");

  const response = await apiClient.get(`/posts/${postId}/check-vote`, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  return response.data;
};

export { voteAction, hasPostVoteAction };
