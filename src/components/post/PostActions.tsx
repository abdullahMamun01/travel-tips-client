"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import useAuth from "@/stores/authSore";
import { TPostMutate } from "@/types/post.type";
import { usePostStore } from "@/stores/postStore";
import { useModal } from "@/stores/modalStore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import useDeletePost from "@/hooks/post/useDeletePost";
import { Spinner } from "../ui/spinner";

type TPostActionsProps = TPostMutate & {
  currentUser: string;
};

export default function PostActions({
  currentUser,
  ...res
}: TPostActionsProps) {
  const { auth } = useAuth();
  const { setOpenModal } = useModal();
  const { setPost } = usePostStore();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleSetUpdatePost = () => {
    setPost({
      categories: [res.categories.toString()],
      description: res.description,
      images: res.images,
      postId: res.postId,
      title: res.title,
    });
    setOpenModal();
  };

  const { mutateAsync, isPending,error } = useDeletePost();
console.log(error)
  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents dropdown from closing
    setDeleteDialogOpen(true); // Manually open the dialog
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false); // Manually close the dialog
  };

  const handleDeletePost = async () => {
    const response = await mutateAsync({
      postId: res.postId,
      token: auth?.token as string,
    });
    if (response.success) {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      {auth?.token &&  auth?.user?._id === currentUser && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleSetUpdatePost}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openDeleteDialog}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Alert Dialog outside the DropdownMenu */}
          <AlertDialog open={isDeleteDialogOpen}>
            <AlertDialogContent>
              <h3>Are you sure you want to delete this post?</h3>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDeleteDialog}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction>
                  {isPending ? (
                    <div className="flex gap-2 items-center">
                      <Spinner size="small" /> Deleting...
                    </div>
                  ) : (
                    <button onClick={handleDeletePost} disabled={isPending}>Delete</button>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
