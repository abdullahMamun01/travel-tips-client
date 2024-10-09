"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import useAuth from "@/stores/authSore";

import { useCommentStore } from "@/stores/commentStore";
import { Spinner } from "../ui/spinner";
import useDeleteComment from "@/hooks/post/useDeleteComment";

type TPostActionsProps = {
  commentId: string;
  userId: string;
  comment: string;
};
export default function CommentAction({
  commentId,
  comment,
  userId,
}: TPostActionsProps) {
  const { auth } = useAuth();
  const {mutateAsync ,isPending} = useDeleteComment()
  const { setComment } = useCommentStore();

  const handleUpdatComment = () => {
    setComment({ commentId, comment });
  };


  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents dropdown from closing
    setDeleteDialogOpen(true); // Manually open the dialog
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false); // Manually close the dialog
  };

  const handleDeleteComment =  async () => {
    const response = await mutateAsync({token:auth?.token as string , commentId:commentId})
    if(response.success){
      closeDeleteDialog()
    }
  };


  return (
    <div>
      {auth?.token &&  auth?.user?._id === userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleUpdatComment}>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteDialog}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={isDeleteDialogOpen}>
        <AlertDialogContent>
          <h3>Are you sure you want to delete this comment?</h3>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment} className="bg-teal-500">
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Spinner size="small" /> Deleting...
                </div>
              ) : (
                <button disabled={isPending}>Delete</button>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
