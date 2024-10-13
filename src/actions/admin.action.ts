'use server'

import apiClient from "@/api/axios";
import { getCurrentUser } from "./auth.action";
import { TAxiosResponse } from "@/services/service.type";
import { TPayment, TPostAdminAccess } from "@/types/admin.type";

export const getAllPosts = async (): Promise<TAxiosResponse<TPostAdminAccess[]>> => {
    const user = await getCurrentUser();
    const response = await apiClient.get(`/admin/posts`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  };

  
export const getAllPayment = async (): Promise<TAxiosResponse<TPayment[]>> => {
  const user = await getCurrentUser();
  const response = await apiClient.get(`/admin/payments`, {
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



  export const toggleBlockkAction = async (payload : {
    userId: string ,
    blockType: "block" | "unblock"
  }) => {
    const user = await getCurrentUser();
    const response = await apiClient.patch(`/admin/users/${payload.userId}/${payload.blockType}` , {}, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  }

//soft delte
  export const deleteUserAction = async (userId: string) => {
    const user = await getCurrentUser();
    const response = await apiClient.delete(`/admin/users/${userId}` , {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  }


  //soft delete
  export const deletePostAction = async (postId: string) => {
    const user = await getCurrentUser();
    const response = await apiClient.delete(`/admin/posts/${postId}` , {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  
    return response.data;
  }