'use client'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area';
import { Avatar } from './Avatar';
import { followings } from '@/actions/user.action';
import { useQuery } from '@tanstack/react-query';

export default function FollwoingList({userId}: {userId:string}) {
    const { data, isLoading } = useQuery({
        queryKey: ["users-followers"],
        queryFn: async () => await followings(userId),
      });
      console.log(data);
      if (isLoading) {
        return <div>Loadig.....</div>;
      }
      const followoingsData = data?.data;
  return (
    <div>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        {followoingsData?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center space-x-4">
              <Avatar image={user?.image} name={user.firstName} />
              <div>
                <p className="text-sm font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}
