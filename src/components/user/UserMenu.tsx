"use client";
import {
  Bell,
  DollarSign,
  Edit,
  LogOut,
  Moon,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import CreatePostBtn from "../modal/CreatePostBtn";
import useAuth from "@/stores/authSore";
import { Avatar } from "./Avatar";
import VerifiedModal from "../profile/VerifiedModal";
import { useEffect, useState } from "react";
import { getEligibility } from "@/services/verified.service";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";

const UserMenu = () => {
  const { setAuth, auth } = useAuth();
  const user = auth?.user;
  const handleLogout = () => {
    setAuth({ token: null, user: null });
  };
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const fetEligibleSubscription = async () => {
      const response = await getEligibility(auth?.token as string);

      setIsEligible(response);
    };

    if (auth?.token) {
      fetEligibleSubscription();
    }
  }, []);

  let isVerifyComponent: React.ReactNode | null = null;

  if (!auth?.user?.isVerified && isEligible) {
    isVerifyComponent = <VerifiedModal />;
  }

  return (
    <div className="flex items-center space-x-4 max-md:flex-col mad-md:gap-4">
      <CreatePostBtn />
      <Bell className="h-6 w-6 cursor-pointer max-md:hidden" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="max-md:my-3">
            <Avatar name={user?.firstName as string} image={user?.image} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/profile"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>View Profile</span>
            </DropdownMenuItem>
          </Link>
          {user?.role === "admin" && (
            <Link href={"/dashboard"}>
              <DropdownMenuItem>
                <DashboardIcon className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Avatar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Contributor Program</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isVerifyComponent}
    </div>
  );
};

export default UserMenu;
