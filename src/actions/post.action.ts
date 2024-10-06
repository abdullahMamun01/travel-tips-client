'use server'
import apiClient from "@/api/axios";
import { cookies } from "next/headers";
import { getCurrentUser } from "./auth.action";

const createPost = async (payload: FormData) => {
  const user = await getCurrentUser();

  // Instead of spreading, directly append userId to FormData
  payload.append('userId', user?.userId);

  const token = cookies().get("accessToken");

  const response = await apiClient.post("/posts", payload, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'multipart/form-data'
      // Do NOT set Content-Type, Axios will handle it
    },

  });
  console.log(response);
  return response.data;
};
export {createPost}