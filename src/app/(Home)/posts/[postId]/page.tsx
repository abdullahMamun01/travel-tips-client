import { getCurrentUser } from "@/actions/auth.action";
import apiClient from "@/api/axios";
import CommentList from "@/components/comments/CommentList";


import PostDetailsHeader from "@/components/post/PostDetails/PostDetailsHeader";
import PostOverviewCard from "@/components/post/PostDetails/PostOverviewCard";
import PremiumContentWarning from "@/components/post/PremiumContentWarning";


import { QueryClient } from "@tanstack/react-query";
import React from "react";

const PostDetails = async (postId: string) => {
  const response = await apiClient.get(`/posts/${postId}`);
  return response.data;
};

interface PostParams {
  params: {
    postId: string; // Assuming postId is a string, adjust the type as needed
  };
}

export default async function PostDetailsPage({
  params: { postId },
}: PostParams) {
  const queryClient = new QueryClient();
  const { data } = await queryClient.fetchQuery({
    queryKey: ["posts", postId],
    queryFn: async () => await PostDetails(postId),
  });

  const user = await getCurrentUser();

  if (data.premium && user?.isVerified) {
    return <PremiumContentWarning />;
  }

  return (
    <div className="min-h-screen w-full  bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <PostDetailsHeader data={data} />
      <main className="container mx-auto px-4 py-8">
        <PostOverviewCard data={data} />
        {/* <PostComments/> */}

        <CommentList postId={postId} />
      </main>
    </div>
  );
}
