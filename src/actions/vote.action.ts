"use server";
import apiClient from "@/api/axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type TVote = {
  postId: string;
  voteType: "upvote" | "downvote";
};

const voteAction = async (payload: TVote) => {
  //   const user = await getCurrentUser();

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

  if (response.status === 200) {
    revalidatePath("/");
  }
  return response.data;
};
export { voteAction };
