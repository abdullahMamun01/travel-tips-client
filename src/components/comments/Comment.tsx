"use client";
import { MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";
import { Avatar } from "../user/Avatar";
import { TComment } from "@/types/comment.type";
import { timeAgo } from "@/lib/timeAgo";
import Replies from "./Replies";
import CommentAction from "./CommentAction";

import CommentBox from "./CommentBox";
import { useCommentStore } from "@/stores/commentStore";


export default function Comment({
  user,
  replies,
  createdAt,
  comment,
  _id
}: TComment) {
  const commentId = _id
  const {selectedComment} = useCommentStore()
  return (
    <div>
  
      <div className="flex items-start space-x-4 relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <CommentAction   comment={comment} commentId={commentId} userId={user._id}/>
      </div>
        <Avatar name={user.firstName} image={user.image || undefined} />
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {timeAgo(createdAt)}
                </p>
              </div>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{comment}</p>
          </div>
          <div className="flex items-center mt-2 space-x-2">
            <Button
              variant="link"
              className="text-sm text-blue-600 dark:text-blue-400"
            >
              reply
            </Button>
            <Button
              variant="link"
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              Share
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div>
            {selectedComment?.commentId === commentId && <CommentBox/>}
          </div>
          <div className="my-8 ">
            {replies?.map((reply) => (
              <Replies key={reply._id} {...reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
