import React from "react";
import { Badge } from "../ui/badge";
import { CheckCircle } from "lucide-react";

export default function ProfileBadge() {
  return (
    <Badge variant="secondary" className="ml-2">
      <CheckCircle className="h-4 w-4 mr-1" />
      Verified
    </Badge>
  );
}
