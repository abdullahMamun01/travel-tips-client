"use client";
import { voteAction } from "@/actions/vote.action";
import useAuth from "@/stores/authSore";
import { IPost } from "@/types/post.type";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useVote() {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  return useMutation({
    mutationFn: voteAction,

    onMutate: async (newVote) => {
      const { postId, voteType } = newVote;
      const userId = auth?.user?._id;

      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot previous value to roll back if needed
      const previousData = queryClient.getQueryData<
        InfiniteData<{ data: IPost[] }>
      >(["posts"]);
      
      // Optimistically update the cache
      queryClient.setQueriesData<InfiniteData<{ data: IPost[] }>>(
        { queryKey: ["posts"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post._id === postId
                  ? updatePostVotes(post, userId as string, voteType)
                  : post
              ),
            })),
          };
        }
      );

 
      return { previousData };
    },

    onError: (error, _newVote, context) => {
      // Roll back to the previous data if mutation fails
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
      toast.error(error.message, { position: "top-right" });
    },

    onSuccess: () => {
      toast.success("Vote recorded", { position: "top-right" });
    },


  });
}



function updatePostVotes(post: IPost, userId: string, voteType: "upvote" | "downvote"): IPost {
  const isUpvote = voteType === "upvote";
  const alreadyUpvoted = post.upvotes.includes(userId);
  const alreadyDownvoted = post.downvotes.includes(userId);

  const updatedUpvotes = isUpvote
    ? alreadyUpvoted
      ? post.upvotes.filter((id) => id !== userId) 
      : [...post.upvotes, userId] 
    : post.upvotes.filter((id) => id !== userId); 

  const updatedDownvotes = !isUpvote
    ? alreadyDownvoted
      ? post.downvotes.filter((id) => id !== userId) 
      : [...post.downvotes, userId] 
    : post.downvotes.filter((id) => id !== userId); 

  return {
    ...post,
    upvotes: updatedUpvotes,
    downvotes: updatedDownvotes,
  };
}
