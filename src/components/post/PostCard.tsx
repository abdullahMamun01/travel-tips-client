import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { IPost } from "@/types/post.type";
import imageUrlParser from "@/lib/imageUrlParser";
import Vote from "./vote/Vote";
import PostBadge from "./PostBadge";
import PostActions from "./PostActions";

export default function PostCard({
  title,
  images,
  categories,
  user,
  commentCount,
  upvoteCount,
  downvoteCount,
  description,
  premium,
  userId,
  _id : postId
}: IPost) {
  const contentType = premium ? "premium" : "free";
  return (
    <Card className="bg-white relative shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ">
        <PostBadge categories={categories} contentType={contentType} />
      <div className="absolute top-2 right-2 flex space-x-2">
        <PostActions currentUser={userId}/>
      </div>

      <CardHeader className="p-0">
        <Image
          width={500}
          height={500}
          quality={100}
          src={imageUrlParser(images[0])}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {/* <div className="absolute top-2 right-40 bg-teal-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
          {categories.toString()}
        </div> */}
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.firstName.slice(
                0,
                1
              )}`}
            />
            <AvatarFallback>{user.firstName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.firstName}</p>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

        {/* <div  */}
        <div
          className="line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* <Upvote upvotes={upvoteCount} />
          <DownVote downvotes={downvoteCount} /> */}
          <Vote upvotes={upvoteCount} downvotes={downvoteCount} postId={postId} />
        </div>
        <Button
          variant="ghost"
          className="text-teal-600 hover:text-teal-800 p-1"
        >
          <MessageCircle className="h-5 w-5 mr-1" />
          {commentCount}
        </Button>
      </CardFooter>
    </Card>
  );
}
