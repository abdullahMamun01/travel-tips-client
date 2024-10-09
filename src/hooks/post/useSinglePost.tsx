
import apiClient from "@/api/axios";
import { useQuery } from "@tanstack/react-query";



export default function useCreatePost(postId: string) {
  const singlePost = async () => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  };

  return useQuery({
    queryFn: singlePost,
    queryKey: ["posts", postId],
  });
}
