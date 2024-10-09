

import { User } from "@/components/profile/profile.type";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsOverview from "@/components/profile/StatsOverview";
import TabsContentSection from "@/components/profile/TabsContentSection";
import UserInfo from "@/components/profile/UserInfos";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const mockUser: User = {
  name: "Alice Traveler",
  username: "@alicetravels",
  avatar: "https://i.pravatar.cc/150?img=5",
  bio: "Adventure seeker | Photography enthusiast | World explorer",
  location: "Bali, Indonesia",
  website: "https://alicetravels.com",
  email: "alice@travels.com",
  joinDate: "May 2020",
  posts: [
    {
      id: 1,
      image: "https://source.unsplash.com/random/300x300?bali",
      likes: 120,
      comments: 15,
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/300x300?beach",
      likes: 95,
      comments: 8,
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/300x300?mountain",
      likes: 200,
      comments: 32,
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/300x300?city",
      likes: 150,
      comments: 20,
    },
    {
      id: 5,
      image: "https://source.unsplash.com/random/300x300?food",
      likes: 80,
      comments: 10,
    },
    {
      id: 6,
      image: "https://source.unsplash.com/random/300x300?sunset",
      likes: 180,
      comments: 25,
    },
  ],
  followers: 5280,
  following: 420,
};

export default function ProfilePage() {
 

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="mb-8">
        <CardContent className="p-6">
          <ProfileHeader  />
          {/* <StatsOverview
            posts={user.posts.length}
            followers={user.followers}
            following={user.following}
          /> */}
        </CardContent>
      </Card>

      <TabsContentSection  />
    </div>
  );
}
