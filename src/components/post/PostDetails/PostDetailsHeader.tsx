import apiClient from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/user/Avatar";
import { IPostResponse, TSinglePostResponse } from "@/types/post.type";
import { QueryClient } from "@tanstack/react-query";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { useRouter } from "next/router";

import React from "react";

const mockPost = {
  id: 1,
  title: "10 Hidden Beaches in Bali",
  content:
    "Discover secluded paradises away from the tourist crowds. Bali, known for its stunning beaches, still hides some gems that are yet to be fully discovered by the masses. From the black sand beaches of the north to the rugged cliffs of the south, here are ten hidden beaches that will take your breath away...",
  image:
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=600&fit=crop",
  author: "Alice Traveler",
  authorAvatar: "A",
  date: "May 15, 2023",
  category: "Beach",
  views: 1500,
  likes: 120,
};

const PostDetails = async () => {
  const response = await apiClient.get(`/posts/6701726af7a9d5e4156d6b3a`);
  return response.data;
};

export default async function PostDetailsHeader() {
  const queryClient = new QueryClient();
  const { data }: TSinglePostResponse = await queryClient.fetchQuery({
    queryKey: ["posts", "6701726af7a9d5e4156d6b3a"],
    queryFn: PostDetails,
  });


  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          // onClick={() => router.back()}
          className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {data.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
              name={data.user.firstName}
              image={data?.user.image || undefined}
            />
            <div className="ml-4">
              <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {data.user.firstName} {data.user.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {data.createdAt}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
