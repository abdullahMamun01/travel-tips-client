"use client";
import { updateUserRole } from "@/actions/admin.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

export default function useRoleUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["admin-users"]})
      toast.success(`User role update to ${data.role} successfully`, {
        position: "top-right",
      });
    },
    onError: (err) => {
      toast.error(err.message, { position: "top-right" });
    },
  });
}
