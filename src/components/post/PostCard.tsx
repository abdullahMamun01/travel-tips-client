import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

import { IPost } from "@/types/post.type";
import imageUrlParser from "@/lib/imageUrlParser";
import Vote from "./vote/Vote";
import PostBadge from "./PostBadge";
import PostActions from "./PostActions";
import { Avatar } from "../user/Avatar";

import FollowUnfollow from "../user/FollowUnfollow";
import Link from "next/link";

// const FollowUnfollow = dynamic(() => import("../user/FollowUnfollow"), {
//   ssr: false
// });

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
  _id: postId,
}: IPost) {
  const contentType = premium ? "premium" : "free";

  const imageList = images.map((img) => imageUrlParser(img));

  return (
    <Card className="bg-white relative shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ">
      <Link href={`/posts/${postId}`}>
        <PostBadge categories={categories} contentType={contentType} />
        <div className="absolute top-2 right-2 flex space-x-2">
          <PostActions
            currentUser={user._id}
            postId={postId}
            categories={categories}
            description={description}
            images={imageList}
            title={title}
          />
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
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-x-2 mb-4">
            {/* <div className="flex items-center justify-between */}

            <div className="flex gap-3 items-center">
              <Avatar name={user.firstName} image={user.image} />
              <div>
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
            <div>
              <FollowUnfollow userId={user._id} />
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
            <Vote
              upvotes={upvoteCount}
              downvotes={downvoteCount}
              postId={postId}
            />
          </div>
          <Button
            variant="ghost"
            className="text-teal-600 hover:text-teal-800 p-1"
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            {commentCount}
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}