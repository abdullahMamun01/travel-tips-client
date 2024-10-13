"use client";
import useComments from "@/hooks/post/useComments";

import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import CommentBox from "./CommentBox";
import Comment from "./Comment";

export default function CommentList({ postId }: { postId: string }) {
  const { data, isLoading } = useComments(postId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const commetns = data?.data;

  return (
    <div>
      <Card className="shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Comments
          </h2>
        </CardHeader>
        <CardContent>
          <CommentBox />
          {commetns?.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
        </CardContent>
      </Card>

      {}
    </div>
  );
}
