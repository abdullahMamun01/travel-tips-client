"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Users, UserPlus } from "lucide-react";

import useUserPosts from "@/hooks/user/useUserPosts";
import useAuth from "@/stores/authSore";
import PostCard from "../post/PostCard";
import FollowerList from "../user/FollowerList";
import FollwoingList from "../user/FollwoingList";

export default function TabsContentSection({userId} : {userId?:string}) {
  const { auth } = useAuth();
  const currentUserId = userId ? userId : auth?.user?._id
  const { data } = useUserPosts(currentUserId as string);

  return (
    <Tabs defaultValue="posts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="posts" className="flex items-center">
          <Grid className="h-4 w-4 mr-2" />
          Posts
        </TabsTrigger>
        <TabsTrigger value="followers" className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Followers
        </TabsTrigger>
        <TabsTrigger value="following" className="flex items-center">
          <UserPlus className="h-4 w-4 mr-2" />
          Following
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data && data?.data?.length > 0 ? (
            <>
            
              {data?.data?.map((post) => (
                <PostCard key={post._id} {...post} />
              ))}
            </>
          ) : (
            <div>You Do not Create yet any post</div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="followers">
        <p className="text-gray-600 dark:text-gray-400">
          <FollowerList userId={currentUserId as string}/>
        </p>
      </TabsContent>
      <TabsContent value="following">
        <p className="text-gray-600 dark:text-gray-400">
          Following list would go here.

        </p>
        <FollwoingList userId={currentUserId as string} />
      </TabsContent>
    </Tabs>
  );
}
