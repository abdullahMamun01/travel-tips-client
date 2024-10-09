"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import useDeletePost from "@/hooks/post/useDeletePost";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export default function DeletePostAlert({ postId }: { postId: string }) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {mutateAsync ,isPending} = useDeletePost()

  const openDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents dropdown from closing
    setDeleteDialogOpen(true); // Manually open the dialog
  };

  const closeDeleteDialog = (e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteDialogOpen(false); // Manually close the dialog
  };
  return (
    <>
      <button onClick={openDeleteDialog} className="flex">
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </button>
      <AlertDialog open={isDeleteDialogOpen} >
        <AlertDialogContent>
          <h3>Are you sure you want to delete this post?</h3>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-teal-500">
              {
                isPending ?<div className="flex gap-2 items-center"><Spinner size="small" /> Deleting...</div> : <button>Delete</button>
              }
            </AlertDialogAction>
          </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
