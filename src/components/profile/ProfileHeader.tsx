import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Camera } from "lucide-react";

import UserInfo from "./UserInfos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSingleUser } from "@/services/userService";
import { getCurrentUser } from "@/actions/auth.action";
import imageUrlParser from "@/lib/imageUrlParser";

type Props = {
  userId?:string
}

export default async function ProfileHeader({userId} :Props) {

  const currentUser = await getCurrentUser();
  const currentUserId = userId ? userId : currentUser?.userId
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ["profile"],
    queryFn: async () => await getSingleUser(currentUserId),
  });
  const user = data.data;

  const imageUrl = user?.image
    ? imageUrlParser(user?.image)
    : `https://api.dicebear.com/6.x/initials/svg?seed=${user.firstName.slice(
        0,
        1
      )}`;
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
            <AvatarImage src={imageUrl} alt={user.firstName} />
            <AvatarFallback>{user.firstName[0]}</AvatarFallback>
          </Avatar>

          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-blue-500 hover:bg-blue-600"
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Change avatar</span>
          </Button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <UserInfo user={user} />
        </div>
        
      </HydrationBoundary>
    </div>
  );
}
