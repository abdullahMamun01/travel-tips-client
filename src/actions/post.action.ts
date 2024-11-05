"use server";
import apiClient from "@/api/axios";
import { cookies } from "next/headers";
import { getCurrentUser } from "./auth.action";
import { revalidatePath } from "next/cache";
import { IPostResponse } from "@/types/post.type";
type TPayload = {
  searchTerm?: string;
  categories?: string;
  sortBy?: string;
  pageParam: string;
};

export const getPosts = async (payload: TPayload): Promise<IPostResponse> => {
  const { searchTerm, categories, sortBy, pageParam } = payload;
  
  const queryParams = new URLSearchParams();

  if (searchTerm) {
    queryParams.append("searchTerm", searchTerm);
  }

  if (categories) {

    queryParams.append("categories", categories);
    
  }

  if (sortBy) {
    if (sortBy === "Most Upvote") {
      queryParams.append("mostVote", "true");
    } else queryParams.append("mostVote", "false");
  }

  queryParams.append("page", pageParam);
  queryParams.append("limit", "4");
  
  const response = await apiClient.get(`/posts?${queryParams.toString()}`);

  return response.data.data;
};

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
  revalidatePath("/");
  return response.data;
};

export { createPost, deletPostAction };
