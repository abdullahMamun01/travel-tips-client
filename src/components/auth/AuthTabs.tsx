import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  return (
    <Tabs value={pathname.slice(1)} className="w-full my-6">
      <TabsList className="grid w-full grid-cols-2">
        <Link href="/login" className="w-full text-center">
          <TabsTrigger value="login" className="w-full">
            Login
          </TabsTrigger>
        </Link>
        <Link href="/register">
          <TabsTrigger value="register" className="w-full">
            Register
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
