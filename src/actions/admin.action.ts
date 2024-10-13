'use server'

import apiClient from "@/api/axios";
import { getCurrentUser } from "./auth.action";
import { TAxiosResponse } from "@/services/service.type";
import { TPostAdminAccess } from "@/types/admin.type";

export const getAllPosts = async (): Promise<TAxiosResponse<TPostAdminAccess[]>> => {
    const user = await getCurrentUser();
    const response = await apiClient.get(`/admin/posts`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  };



  export const updateUserRole  = async (payload: {role:string , userId: string}) => {
    const user = await getCurrentUser();
    const response = await apiClient.patch(`/admin/${payload.userId}/role` , {role: payload.role}, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  }