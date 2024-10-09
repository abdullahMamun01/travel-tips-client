import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ControlledInput from "../ControlledInput/ControlledInput";
import TravelCategory from "../form/TravelCategory";
import TextEditor from "../form/TextEditor";

import { zodResolver } from "@hookform/resolvers/zod";

import ImageUpload from "../form/ImageUpload";
import { postValidateSchema } from "@/validate-schema/post.schema";
import { TPost } from "@/types/post.type";
import useCreatePost from "@/hooks/post/useCreatePost";
import SubmitButton from "../form/SubmitButton";
import { usePostStore } from "@/stores/postStore";
import useUpdatePost from "@/hooks/post/useUpdatePost";
import { useModal } from "@/stores/modalStore";

export default function PostModal() {
  const { mutateAsync, isPending } = useCreatePost();
  const updatePostMutate = useUpdatePost();

  const { updatePost } = usePostStore();
  const {setCloseModal} = useModal()
  const form = useForm<TPost>({
    resolver: zodResolver(postValidateSchema),
    defaultValues: {
      description: updatePost?.description || "",
      title: updatePost?.title || "",
    },
  });

  const onSubmit: SubmitHandler<TPost> = async (data) => {
    const formValues = { ...data };

    formValues.categories = [formValues.categories.toString()];
    const formData = new FormData();

    for (const [key, value] of Object.entries(formValues)) {
      if (key === "images" && value instanceof FileList) {
        Array.from(value).forEach((file) => {
          formData.append(`images`, file);
        });
      } else {
        formData.append(key, value as string);
      }
    }
    if (updatePost) {
      await updatePostMutate.mutateAsync({
        body: formData,
        postId: updatePost.postId,
      });
      setCloseModal()
    } else {
      await mutateAsync(formData);
      setCloseModal()
    }

  };

  return (
    <div>
      <div className="space-y-4">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <ControlledInput
                name="title"
                placeholder="enter your post title"
                inputType="text"
                formControl={form.control}
                label="Title"
              />
            </div>

            <div>
              <TravelCategory formControl={form.control} />
            </div>

            <div>{/* <TravelCategory formControl={form.control} /> */}</div>
            <div className="mb-8">
              <TextEditor formControl={form.control} />
            </div>

            <div className="mt-20 mb-10">
              <ImageUpload />
            </div>

            <SubmitButton isLoading={updatePost? updatePostMutate.isPending : isPending}>
              {updatePost ? "update post" : "create new post"}
            </SubmitButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
