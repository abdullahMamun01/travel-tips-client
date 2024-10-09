"use client";

import { updateProfileAction } from "@/actions/user.action";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";



export default function useUpdateUserProfile(userId: string) {

  return useMutation({
    mutationKey: ["user", userId],
    mutationFn: updateProfileAction,
    onSuccess : () => {
      toast.success('update profile successfully' , {position:'top-right'})
    },
    onError : (err) => {
      toast.error(err.message , {position:'top-right'})
    }
  });
}
