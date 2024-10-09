"use server";

import apiClient from "@/api/axios";
import {
  TFollowUnfollow,
  TProfileUpdatePayload,
} from "@/services/types/user.type";
import { updateProfile } from "@/services/userService";
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (payload: TProfileUpdatePayload) => {
  const respones = await updateProfile(payload);
  return respones.data;
};

export const followUserAction = async (payload: TFollowUnfollow) => {
  const response = await apiClient.post(
    `/users/${payload.userId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    }
  );
  revalidatePath('/')
  return response.data;
};
// '/:userId/follow-status'
export const unfollowAction = async (payload: TFollowUnfollow) => {
  const response = await apiClient.post(
    `/users/${payload.userId}/unfollow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${payload?.token}`,
      },
    }
  );
  revalidatePath('/')
  return response.data;
};


