"use client";

import { getSingleUser } from "@/services/userService";

import { useQuery } from "@tanstack/react-query";



export default function useProfile(userId: string) {
  // const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getSingleUser(userId),
  });
}
