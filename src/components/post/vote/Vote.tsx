"use client";
import { Button } from "@/components/ui/button";
import useVote from "@/hooks/votes/useDownvote";
import useAuth from "@/stores/authSore";

import { ArrowDown, ArrowUp, MessageSquare } from "lucide-react";
import React, { useState } from "react";
type TVoteProps = {
  postId: string;
  commentCount?: number;
  votes?: string[];
  upvotes: string[];
  downvotes: string[];
};
export default function Vote({
  upvotes,
  downvotes,
  postId,
  commentCount,
}: TVoteProps) {
  const { auth } = useAuth();
  const downvote = useVote();
  const upvote = useVote();
  const [voteCount, setVoteCount] = useState(upvotes.length - downvotes.length);
  const [upvoteList, setUpvoteList] = useState(upvotes);
  const [downvoteList, setDownVoteList] = useState(downvotes);

  const handleDownvote = async (e: React.FormEvent) => {
    e.preventDefault();
     await downvote.mutateAsync({
      postId,
      voteType: "downvote",
    });
    setVoteCount(upvotes.length - 1);
    setDownVoteList((prev) => [...prev, auth?.user?._id as string]);
    setUpvoteList(upvoteList.filter((vote) => vote != auth?.user?._id));
  };

  const handleUpvote = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await upvote.mutateAsync({ postId, voteType: "upvote" });
    setVoteCount(upvotes.length + 1);
    setUpvoteList((prev) => [...prev, response.data.userId]);
    setDownVoteList((prev) => prev.filter((vote) => vote != auth?.user?._id));
  };

  const hasUpvote = auth
    ? upvoteList.includes(auth?.user?._id as string)
    : null;
  const hasDownVote = auth
    ? downvoteList.includes(auth?.user?._id as string)
    : null;
  console.log(upvoteList, downvoteList);

  return (
    <div className="flex items-center bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-sm">
      <div className="flex space-x-4">
        <form onSubmit={handleUpvote}>
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className={`${
              hasUpvote
                ? "text-gray-100 bg-blue-600 "
                : "text-gray-600 hover:text-blue-600 "
            }`}
            disabled={auth ? false : true}
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            {voteCount}
          </Button>
        </form>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-blue-600"
          disabled={auth ? false : true}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          {commentCount}
        </Button>
        <form onSubmit={handleDownvote}>
          <Button
            variant="ghost"
            type="submit"
            size="sm"
            className={`${
              hasDownVote
                ? "text-gray-100 bg-red-600 "
                : "text-gray-600 hover:text-blue-600 "
            }`}
          >
            <ArrowDown className="w-4 h-4 mr-1" />
          </Button>
        </form>
      </div>
    </div>
  );
}
