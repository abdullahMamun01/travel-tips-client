import apiClient from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import imageUrlParser from "@/lib/imageUrlParser";
import { TSinglePostResponse } from "@/types/post.type";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React from "react";



const PostDetails = async () => {
  const response = await apiClient.get(`/posts/6701726af7a9d5e4156d6b3a`);
  return response.data;
};
export default async function PostOverviewCard() {
  const queryClient = new QueryClient();
  const { data }: TSinglePostResponse = await queryClient.fetchQuery({
    queryKey: ["posts", "6701726af7a9d5e4156d6b3a"],
    queryFn: PostDetails,
  });

  return (
    <Card className="mb-8 overflow-hidden shadow-lg">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CardHeader className="p-0">
          <Image
            width={1000}
            height={1000}
            src={imageUrlParser(data.images[0])}
            alt={data.title}
            quality={100}
            className="w-full h-96 object-cover "
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{__html:data.description}} />
            
        
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <ThumbsUp className="mr-2 h-5 w-5" />
              {10}
            </Button>
            <Button
              variant="ghost"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {20}
            </Button>
          </div>
        </CardFooter>
      </HydrationBoundary>
    </Card>
  );
}
