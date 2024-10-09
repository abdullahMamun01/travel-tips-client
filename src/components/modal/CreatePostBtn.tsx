"use client";
import React from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import dynamic from "next/dynamic";
import { useModal } from "@/stores/modalStore";
import { usePostStore } from "@/stores/postStore";

const PostModal = dynamic(() => import("./PostModal"), { ssr: false });


export default function CreatePostBtn() {
  const {isOpen ,toggleModal} = useModal()
  const {clearPost} = usePostStore()
  const handleModalChange = () => {
    toggleModal()
    clearPost()
  }

  return (
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={handleModalChange}>
        <DialogTrigger asChild>
          <Button className="bg-white text-teal-600 hover:bg-teal-100">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:w-full md:max-w-[925px] max-h-[80vh]  overflow-auto">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the world. Fill in the details below to
              create your post.
            </DialogDescription>
          </DialogHeader>
          <PostModal />
        </DialogContent>
      </Dialog>
    </div>
  );
}
