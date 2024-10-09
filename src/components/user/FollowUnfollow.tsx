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

const FollowUnfollowButton = ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const [followingStatus, setFollowingStatus] = useState(false);
  const followAction = useFollowAction();
  const unfollowAction = useUnfollowAction();
  const isLoading = followAction.isPending || unfollowAction.isPending;
  useEffect(() => {
    async function fetchFollowingStatus() {
      const response = await isFollowingAction({ token, userId });
      setFollowingStatus(!!response.data); // assuming your API returns this
    }

    if (token) {
      fetchFollowingStatus();
    }
  }, [token, userId]);

  const handleFollow = async () => {
    await followAction.mutateAsync({ token, userId });
  };

  const handleUnfollow = async () => {
    await unfollowAction.mutateAsync({ token, userId });
  };

  const handleFollowAction = () => {
    if (followingStatus) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={handleFollowAction}
      variant={followingStatus ? "secondary" : "default"}
      size="sm"
      disabled={isLoading}
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

// Main component to check authentication
export default function FollowUnfollow({ userId }: TFollowUnfollowProps) {
  const { auth } = useAuth();

  return (
    <div>
      {auth?.user?._id != userId && (
        <>
          {auth?.token ? (
            <FollowUnfollowButton userId={userId} token={auth.token} />
          ) : (
            <Button variant="default" size="sm" disabled>
              <UserPlus className="h-4 w-4 mr-2" />
              Follow
            </Button>
          )}
        </>
      )}
    </div>
  );
}
