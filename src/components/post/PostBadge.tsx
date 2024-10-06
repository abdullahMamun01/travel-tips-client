import React from "react";
import { Badge } from "../ui/badge";

type TPostBadgeProps = {
  categories: string | string[];
  contentType: string;
};

export default function PostBadge({
  categories,
  contentType,
}: TPostBadgeProps) {
  return (
    <div className="absolute top-2 right-16 flex space-x-2">
      <Badge
        variant="secondary"
        className="bg-blue-600 dark:bg-blue-500 text-white"
      >
        {categories.toString()}
      </Badge>
      <Badge
        variant="secondary"
        className={
          contentType === "premium"
            ? "bg-yellow-500 text-white"
            : "bg-green-500 text-white"
        }
      >
        {contentType}
      </Badge>
    </div>
  );
}
