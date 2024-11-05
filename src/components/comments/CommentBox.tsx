"use client";

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
  const { selectedComment, clearComment } = useCommentStore();
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
      clearComment();
    } else {
      await mutateAsync({ ...payload, postId: postId as string });
    }
    form.reset();
  };



  return (
    <div
      className={`flex items-start space-x-4 mb-6 relative border-y border-gray-300 py-4 ${
        selectedComment && "ml-4"
      }`}
    >
      {auth?.token ? (
        <>
          {!selectedComment && <Avatar name={user?.firstName as string}  userId={user?._id as string}/>}
          <FormProvider {...form}>
            <div className="flex-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1 relative">
                  <textarea
                    {...register("comment", {
                      required: "Comment is required",
                    })}
                    placeholder="Post your reply"
                    rows={4}
                    className="w-full min-h-[40px] p-4 rounded-md max-h-[300px] resize-none bg-transparent text-base leading-relaxed outline-none"
                    ref={(e) => {
                      register("comment").ref(e); // React Hook Form's ref
                    }}
                  />

                  <div className="absolute bottom-2 right-2">
                   
                    <div className="mt-2">
                      <SubmitButton
                        isLoading={
                          selectedComment ? updateComment.isPending : isPending
                        }
                       className="rounded-full px-4 py-2 bg-gray-600 text-sm"
                      >
                        {selectedComment ? "comment reply" : "Post reply"}
                      </SubmitButton>
                    </div>
                  </div>
                </div>

                {/* Show validation error */}
                {errors.comment && (
                  <p className="text-red-500 text-sm">
                    {errors.comment.message as string}
                  </p>
                )}
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
