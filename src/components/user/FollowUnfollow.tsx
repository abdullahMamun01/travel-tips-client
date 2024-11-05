"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserMinus, UserPlus } from "lucide-react";
import useAuth from "@/stores/authSore";
import { isFollowingAction } from "@/services/userService";
import useFollowAction from "@/hooks/follow/useFollowAction";
import useUnfollowAction from "@/hooks/follow/useUnFollowAction";

type TFollowUnfollowProps = {
  userId: string;
};

const FollowUnfollowButton = ({ userId }: TFollowUnfollowProps) => {
  const { auth } = useAuth();
  const token = auth?.token;

  const [followingStatus, setFollowingStatus] = useState(false);
  const followAction = useFollowAction();
  const unfollowAction = useUnfollowAction();
  const isLoading = followAction.isPending || unfollowAction.isPending;

  useEffect(() => {
    if (token) {
      const fetchFollowingStatus = async () => {
        const response = await isFollowingAction({ token, userId });
        setFollowingStatus(!!response.data); // assuming your API returns this
      };
      fetchFollowingStatus();
    }
  }, [token, userId]);

  const handleFollowAction = async () => {
    if (followingStatus) {
      await unfollowAction.mutateAsync({ token: token  as string, userId });
      setFollowingStatus(false);
    } else {
      await followAction.mutateAsync({ token: token  as string, userId });
      setFollowingStatus(true);
    }
  };

  return (
    <Button
      onClick={handleFollowAction}
      variant={followingStatus ? "secondary" : "default"}
      size="sm"
      disabled={isLoading}
      className="bg-teal-100 text-black hover:bg-teal-200"
    >
      {followingStatus ? (
        <>
          <UserMinus className="h-4 w-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4 mr-2" />
          Follow
        </>
      )}
      
    </Button>
  );
};

export default FollowUnfollowButton;
