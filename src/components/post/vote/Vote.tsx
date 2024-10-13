"use client";
import { Button } from "@/components/ui/button";
import useVote from "@/hooks/votes/useDownvote";

import {

  ArrowDown,
  ArrowUp,
  MessageSquare,
} from "lucide-react";
import React from "react";
type TVoteProps = {
  upvotes: number;
  downvotes: number;
  postId: string;
};
export default function Vote({ upvotes, downvotes, postId }: TVoteProps) {
  const downvote = useVote();
  const upvote = useVote();
  const handleDownvote = async (e: React.FormEvent) => {
    e.preventDefault();
    await downvote.mutateAsync({ postId, voteType: "downvote" });
  };

  const handleUpvote = async (e: React.FormEvent) => {
    e.preventDefault();
    await upvote.mutateAsync({ postId, voteType: "upvote" });
  };
  return (
    <div className="flex items-center bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-sm">
      <div className="flex space-x-4">
        <form onSubmit={handleUpvote}>
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className="text-gray-600 hover:text-blue-600"
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            {upvotes - downvotes}
          </Button>
        </form>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-blue-600"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          20
        </Button>
        <form onSubmit={handleDownvote}>
          <Button
            variant="ghost"
            type="submit"
            size="sm"
            className="text-gray-600 hover:text-blue-600"
          >
            <ArrowDown className="w-4 h-4 mr-1" />
          </Button>
        </form>
      </div>
    </div>
  );
}
