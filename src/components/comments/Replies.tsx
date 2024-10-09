import React from "react";

import { Reply } from "@/types/comment.type";
import { timeAgo } from "@/lib/timeAgo";
import { Avatar } from "../user/Avatar";

export default function Replies({reply , createdAt ,user} : Reply) {
  return (
    <div className="ml-1 mt-4 flex items-start space-x-4">
      <Avatar name={user.firstName} />
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {user.firstName} {" "} {user.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {timeAgo(createdAt)}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {reply}
          </p>
        </div>
      </div>
    </div>
  );
}
