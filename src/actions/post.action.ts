"use server";
import apiClient from "@/api/axios";
import { cookies } from "next/headers";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";

const createPost = async (payload: FormData) => {
  const user = await getCurrentUser();

  // Instead of spreading, directly append userId to FormData
  payload.append("userId", user?.userId);

  const token = cookies().get("accessToken");

  const response = await apiClient.post("/posts", payload, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "multipart/form-data",
      // Do NOT set Content-Type, Axios will handle it
    },
  });

  return response.data;
};

 const deletPostAction = async ({
  token,
  postId,
}: {
  token: string;
  postId: string;
}) => {
  const response = await apiClient.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidatePath('/')
  return response.data;
};

export { createPost ,deletPostAction};
