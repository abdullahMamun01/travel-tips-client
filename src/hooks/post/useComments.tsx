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
    console.log(postId)
  const response = await apiClient.get(
    `/posts/6701726af7a9d5e4156d6b3a/comments`
  );
  return response.data;
};

export default function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments"],
    queryFn: async () => await commentList(postId),
    
  });
}
