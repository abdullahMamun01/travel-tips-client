'use client'
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/user/Avatar";
import { timeAgo } from "@/lib/timeAgo";
import { TSinglePost } from "@/types/post.type";

import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

export default function PostDetailsHeader({ data }: {data:TSinglePost}) {
  const router  = useRouter()
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md px-3">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Explore
        </Button>
        <h1 className=" md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {data.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar
            userId={data.user._id}
              name={data.user.firstName}
              image={data?.user.image || undefined}
            />
            <div className="ml-4">
              <p className="text-sm md:text-lg font-medium text-gray-900 dark:text-gray-100">
                {data.user.firstName} {data.user.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {timeAgo(data.createdAt)}
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
