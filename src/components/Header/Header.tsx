import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import SearchAndFilter from "../serach/SearchBox";

const AuthHeader = dynamic(() => import("./AuthHeader"), {
  loading: () => <AuthSkeleton />,
  ssr: false,
});

const AuthSkeleton = dynamic(() => import("../skeleton/AuthSkeleton"));

export default function Header() {
  return (
    <header className="px-6 sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 items-center justify-center mx-auto">
        <div className="mr-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-8 w-8 text-primary"
            >
              <path d="M16.5 6a3 3 0 00-3-3H6.5a3 3 0 00-3 3v8a3 3 0 003 3h7a3 3 0 003-3v-8zm-9.007 8.718A3.988 3.988 0 016.5 13V7.257l3.007 3.007zm6.014 0L10.5 10.263l3.007-3.007V13a3.988 3.988 0 01-1.007 1.718zM16.5 8.17l-6-6-6 6V6a2 2 0 012-2h8a2 2 0 012 2v2.17z" />
            </svg>
            Trip Orio
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-xl mx-auto">
            <SearchAndFilter />
          </div>
          <div>
            <div>
              <div className="hidden md:flex items-center space-x-4">
                <AuthHeader />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
