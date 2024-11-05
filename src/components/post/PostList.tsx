"use client";
import { getPosts } from "@/actions/post.action";

import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "../features/InfiniteScroll";

import PostCard from "./PostCard";
import LoadingSpinner from "../ui/Loading";
import { useSearchStore } from "@/stores/searchStore";
import { Frown, PenTool } from "lucide-react";
import { Button } from "../ui/button";


export default function PostList() {
  const { filters } = useSearchStore();

  const { fetchNextPage, hasNextPage, data, isLoading } = useInfiniteQuery({
    queryKey: ["posts", filters || ""],

    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPosts({
        pageParam: pageParam.toString(),
        ...filters,
        categories: filters?.selectedCategory || "",
      });

      return response;
    },

    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
  });

  const postList = data?.pages.flatMap((post) => post.data);

  return (
    <div className="w-full">
      {postList?.length === 0 && <NoDataMessage />}
      {isLoading && <LoadingSpinner />}
      <InfiniteScroll fetchNext={fetchNextPage} hasMore={hasNextPage}>
        <div className="grid grid-cols-1 w-full">
          {postList?.map((post) => (
            <PostCard key={post?._id} {...post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

function NoDataMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
      <Frown className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No travel stories found
      </h3>
      <p className="text-gray-500 max-w-md">
        We couldn not find any travel stories matching your criteria. Try
        adjusting your filters or search query, or be the first to share your
        adventure!
      </p>
      <Button className="mt-6" variant="outline">
        <PenTool className="mr-2 h-4 w-4" />
        Write a Story
      </Button>
    </div>
  );
}
