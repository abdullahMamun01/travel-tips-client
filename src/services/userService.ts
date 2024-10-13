import apiClient from "@/api/axios";
import { TAxiosResponse } from "./service.type";
import {
  TFollowUnfollow,

  TProfileUpdatePayload,
  TUser,
} from "./types/user.type";
import { IPost } from "@/types/post.type";

const getSingleUser = async (
  userId: string
): Promise<TAxiosResponse<TUser>> => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

const getUerPost = async (userId: string): Promise<TAxiosResponse<IPost[]>> => {
  const response = await apiClient.get(`/users/${userId}/posts`);
  return response.data;
};

const updateProfile = async (payload: TProfileUpdatePayload) => {
  const response = await apiClient.patch(`/users/me/profile`, payload.body, {
    headers: {
      Authorization: `Bearer ${payload?.token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const isFollowingAction = async (payload: TFollowUnfollow) => {
  
  const response = await apiClient.get(
    `/users/${payload.userId}/follow-status`,

    {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    }
  );

  return response.data;
};

export { getSingleUser, getUerPost, updateProfile };
