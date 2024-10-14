"use client";
import React from "react";
import { Textarea } from "../ui/textarea";

import useAuth from "@/stores/authSore";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginCommentPropt from "./LoginCommentPropt";


import useAddReply from "@/hooks/reply/useAddReply";
import SubmitButton from "../form/SubmitButton";

// Zod schema for validation
const replySchema = z.object({
  reply: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment must be less than 500 characters"),
});

export default function ReplyBox({ commentId }: { commentId: string }) {
  const { auth } = useAuth();

  const form = useForm<{ reply: string }>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      reply: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  const { mutateAsync, isPending } = useAddReply();
  const onSubmit: SubmitHandler<{ reply: string }> = async (data) => {
    await mutateAsync({ reply: data.reply, commentId: commentId });
    form.reset()
  };

  return (
    <div>
      {auth?.token ? (
        <>
          <FormProvider {...form}>
            <div className="flex-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                  placeholder="Add a reply..."
                  className="w-full resize-none"
                  rows={3}
                  {...register("reply")}
                />
                {/* Show validation error */}
                {errors.reply && (
                  <p className="text-red-500 text-sm">
                    {errors.reply.message as string}
                  </p>
                )}
                <div className="mt-2">
                  <SubmitButton className="bg-teal-500 w-54" isLoading={isPending}>
                    {isPending ? "replying...." : "reply"}
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
