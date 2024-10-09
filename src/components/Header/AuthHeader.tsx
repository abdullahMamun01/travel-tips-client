"use client";
import React from "react";
import UserMenu from "../user/UserMenu";
import AuthenticationButtons from "../auth/AuthenticationButtons";
import useAuth from "@/stores/authSore";

export default function AuthHeader() {
  const { auth } = useAuth();
  //   const handleUser = async () => {
  //     const user = await getCurrentUser();
  //     console.log(user?.token)
  //     if (user?.token) {
  //       setIsLoggedIn(true);
  //     }
  //   };

  return (
    <div className="flex items-center space-x-4">
      {auth?.token ? <UserMenu /> : <AuthenticationButtons />}
    </div>
  );
}
