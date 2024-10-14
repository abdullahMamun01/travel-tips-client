import { MapPin, Mail, Calendar } from "lucide-react";

import { TUser } from "@/services/types/user.type";
import EditProfileModal from "./EditProfileModal";
import { followers, followings } from "@/actions/user.action";

type UserInfoProps = {
  user: TUser;
};

export default async function UserInfo({ user }: UserInfoProps) {
  const userId = user?._id;
  const followerData = await followers(userId )
  const followingData = await followings(userId)
  return (
    <>
      <div className="flex items-center justify-center md:justify-start mb-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mr-2">
          {user.firstName} {user.lastName}
        </h1>
        <EditProfileModal />
      </div>

      <p className="text-gray-800 dark:text-gray-200 mb-4">{user.bio}</p>
      <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {user.address}
        </div>

        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-1" />
          {user.email}
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          Joined {new Date(user.createdAt).toDateString()}
        </div>
      </div>
      <div className="flex space-x-4 text-sm text-sky-500 mt-8">
        <span className="font-bold">{followerData.data.length} Followers</span>
        <span className="font-bold"> {followingData.data.length} Following</span>
      </div>
    </>
  );
}
