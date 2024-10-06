'use client'
import useVote from "@/hooks/votes/useDownvote";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import React from "react";
type TVoteProps = {
  upvotes: number;
  downvotes: number;
  postId:string
};
export default function Vote({ upvotes, downvotes  ,postId}: TVoteProps) {
  const downvote = useVote();
  const upvote = useVote()
  const handleDownvote = async(e: React.FormEvent) => {
    e.preventDefault()
   await downvote.mutateAsync({postId , voteType:'downvote'})
    console.log(downvote.data)
  };
  
  const handleUpvote = async (e: React.FormEvent) => {
    e.preventDefault()
    await upvote.mutateAsync({postId , voteType:'upvote'})

  };
  return (
    <div className="flex items-center bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-sm">
      <form onSubmit={handleUpvote}>
        <button  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
          <ArrowBigUp className="h-6 w-6 text-teal-600 dark:text-blue-400" />
        </button>
      </form>
      <span className="px-2 font-medium text-gray-700 dark:text-teal-300">
        {upvotes - downvotes}
      </span>
      <form onSubmit={handleDownvote}>
        <button type="submit" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors">
          <ArrowBigDown className="h-6 w-6 text-teal-600  dark:text-teal-400" />
        </button>
      </form>
    </div>
  );
}
