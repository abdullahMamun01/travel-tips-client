"use client";
import React from "react";
import { Textarea } from "../ui/textarea";

import useAuth from "@/stores/authSore";
import { Avatar } from "../user/Avatar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginCommentPropt from "./LoginCommentPropt";

import SubmitButton from "../form/SubmitButton";
import { TCommentFormValue } from "@/types/comment.type";
import { useParams } from "next/navigation";
import { useCommentStore } from "@/stores/commentStore";
import useAddComment from "@/hooks/post/useAddComment";
import useUpdateComment from "@/hooks/post/useUpdateComment";

// Zod schema for validation
const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

export default function CommentBox() {
  const { auth } = useAuth();
  const user = auth?.user;
  const { selectedComment ,clearComment } = useCommentStore();
  const updateComment = useUpdateComment();
  const { mutateAsync, isPending } = useAddComment();

  const form = useForm<TCommentFormValue>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: selectedComment?.comment || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { postId } = useParams();

  const onSubmit: SubmitHandler<TCommentFormValue> = async (data: {
    comment: string;
  }) => {
    const payload = {
      ...data,
      token: auth?.token as string,
    };

    if (selectedComment) {
      await updateComment.mutateAsync({
        commentId: selectedComment.commentId as string,
        ...payload,
      });
      clearComment()
    } else {
      await mutateAsync({ ...payload, postId: postId as string });
    }
    form.reset();
  };

  return (
    <div
      className={`flex items-start space-x-4 mb-6 relative ${
        selectedComment && "ml-4"
      }`}
    >
      {auth?.token ? (
        <>
          {!selectedComment && <Avatar name={user?.firstName as string} />}
          <FormProvider {...form}>
            <div className="flex-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                  placeholder="Add a comment..."
                  className="w-full resize-none"
                  rows={3}
                  {...register("comment")}
                />
                {/* Show validation error */}
                {errors.comment && (
                  <p className="text-red-500 text-sm">
                    {errors.comment.message as string}
                  </p>
                )}
                <div className="mt-2">
                  <SubmitButton
                    isLoading={selectedComment ? updateComment.isPending : isPending}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {selectedComment ? "update comment" : "Post Comment"}
                  </SubmitButton>
                  <button type="button" className="ml-4 text-blue-400">
                    <span className="mt-auto">cancel</span>
                  </button>
                </div>
              </form>
            </div>
          </FormProvider>
        </>
      ) : (
        <>
          <LoginCommentPropt />
        </>
      )}
    </div>
  );
}
