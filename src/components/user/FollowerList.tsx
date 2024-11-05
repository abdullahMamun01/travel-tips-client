"use client";
import { followers } from "@/actions/user.action";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Avatar } from "./Avatar";
import { ScrollArea } from "../ui/scroll-area";

import useAuth from "@/stores/authSore";
import FollowUnfollowButton from "./FollowUnfollow";

export default function FollowerList({ userId }: { userId: string }) {
  const {auth} = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ["users-followings"],
    queryFn: async () => await followers(userId),
  });

  if (isLoading) {
    return <div>Loadig.....</div>;
  }
  const followerData = data?.data;

  console.log(followerData)

  return (
    <div>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {followerData?.map((user) => (
          <div
            key={user?._id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-4">
             {user &&  <Avatar userId={user?._id} image={user?.image} name={user?.firstName} />}
              <div>
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              {
                auth?.user?._id != user?._id && <FollowUnfollowButton userId={user?._id} />
              }
  
            </div>

            
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
