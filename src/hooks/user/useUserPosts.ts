"use client";

import { getUerPost } from "@/services/userService";

import { useQuery } from "@tanstack/react-query";

export default function useUserPosts(userId: string) {

  return useQuery({
    queryKey: ["post", userId],
    queryFn: async () => await getUerPost(userId),
  });
}
