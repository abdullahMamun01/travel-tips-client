import React from "react";

import { Button } from "../ui/button";

import {
  Bell,
  Home,
  MoreHorizontal,
  Search,
  Star,
  User,
  Users,
} from "lucide-react";
import AuthHeader from "../Header/AuthHeader";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="sticky top-20 space-y-2 ">
      <nav className="flex flex-col items-center sm:items-start gap-2 space-y-1 w-full">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-center sm:justify-start gap-2"
          >
            <Home className="h-6 w-6" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <Search className="h-6 w-6" />
          <span className="hidden sm:inline">Explore</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <Bell className="h-6 w-6" />
          <span className="hidden sm:inline">Notifications</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <Users className="h-6 w-6" />
          <span className="hidden sm:inline">Communities</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <Star className="h-6 w-6" />
          <span className="hidden sm:inline">Premium</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <User className="h-6 w-6" />
          <span className="hidden sm:inline">Profile</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center sm:justify-start gap-2"
        >
          <MoreHorizontal className="h-6 w-6" />
          <span className="hidden sm:inline">More</span>
        </Button>
      </nav>

      <div className="lg:hidden flex flex-col items-center justify-center">
        <AuthHeader />
      </div>
    </div>
  );
}
