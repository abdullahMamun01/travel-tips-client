"use client";

import apiClient from "@/api/axios";
import { TComment } from "@/types/comment.type";
import { useQuery } from "@tanstack/react-query";

type TCommentResponse = {
    statusCode: number ,
    message: string ,
    success: boolean ,
    data : TComment[]

}

const commentList = async (postId:string) : Promise<TCommentResponse> => {

  const response = await apiClient.get(
    `/posts/${postId}/comments`
  );
  return response.data;
};

export default function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => await commentList(postId),
    
  });
}
