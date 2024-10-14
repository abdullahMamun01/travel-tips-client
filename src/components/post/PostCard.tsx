import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { Bookmark, Link2, Lock } from "lucide-react";
import Image from "next/image";

import { IPost } from "@/types/post.type";
import imageUrlParser from "@/lib/imageUrlParser";
import Vote from "./vote/Vote";

import PostActions from "./PostActions";
import { Avatar } from "../user/Avatar";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { timeAgo } from "@/lib/timeAgo";
import FollowUnfollow from "../user/FollowUnfollow";

export default function PostCard({
  title,
  images,
  categories,
  user,
  description,
  premium,
  createdAt,
  commentCount,
  upvotes,
  downvotes ,

  _id: postId,
}: IPost) {
  const imageList = images?.map((img) => imageUrlParser(img));

  return (
    <Card
      className={`bg-white w-full border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 relative ${
        premium ? "border-2 border-yellow-400" : ""
      }`}
    >
      {premium && (
        <Badge className="absolute top-2 left-2 right-2 bg-yellow-400 text-yellow-900 w-20">
          <Lock className="w-8 h-3 mr-1" />
          Premium
        </Badge>
      )}

      <div className="absolute top-2 right-2 flex space-x-2">
        <PostActions
          currentUser={user?._id}
          postId={postId}
          categories={categories}
          description={description}
          images={imageList}
          title={title}
        />

        <FollowUnfollow userId={user?._id} />
      </div>
      <Link href={`/posts/${postId}`}>
        <CardHeader className="p-0">
          <Image
            width={500}
            height={500}
            quality={100}
            src={imageUrlParser(images[0])}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
      </Link>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <div className="flex items-center justify-between mb-2">
          <Link href={`/profile/${user._id}`}>
            <div className="flex items-center space-x-2">
              <Avatar
                name={user?.firstName}
                isVerified={user.isVerified}
                image={user?.image}
              />
              <span className="text-sm text-gray-600">
                {user.firstName} {user.lastName}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-blue-100 text-blue-800"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {timeAgo(createdAt)}
          time
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 rounded-b-lg">
        <div className="flex items-center space-x-4">
          <Vote
            upvotes={upvotes}
            downvotes={downvotes}
            postId={postId}
            commentCount={commentCount}
  
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-blue-600"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-blue-600"
          >
            <Link2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
