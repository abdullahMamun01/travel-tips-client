"use client";
import { Button } from "@/components/ui/button";
import useVote from "@/hooks/votes/useDownvote";
import useAuth from "@/stores/authSore";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";

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
}: TVoteProps) {
  const { auth } = useAuth();
  const downvote = useVote();
  const upvote = useVote();

  const hasUpvote = auth
    ? upvotes.includes(auth?.user?._id as string)
    : null;
  const hasDownVote = auth
    ? downvotes.includes(auth?.user?._id as string)
    : null;


  const handleDownvote = async (e: React.FormEvent) => {
    e.preventDefault();
     await downvote.mutateAsync({
      postId,
      voteType: "downvote",
    });
  
  };

  const handleUpvote = async (e: React.FormEvent) => {
    e.preventDefault();
   await upvote.mutateAsync({ postId, voteType: "upvote" });

  };




  return (
    <div className="flex items-center bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-sm">
      <div className="flex">
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
            <ArrowBigUp className="w-5 h-5 mr-1" />
            
          </Button>
        </form>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-blue-600"
          disabled={auth ? false : true}
        >

          {upvotes.length - downvotes.length}
        </Button>
        <form onSubmit={handleDownvote}>
          <Button
            variant="ghost"
            type="submit"
            size="sm"
            className={`${
              hasDownVote
                ? "text-gray-100 bg-red-600 "
                : "text-gray-600 hover:text-sky-600 "
            }`}
          >
            <ArrowBigDown className="w-5 h-5 mr-1" />
          </Button>
        </form>
      </div>
    </div>
  );
}
