import React from "react";

import { Globe } from "lucide-react";
import dynamic from "next/dynamic";

// import AuthHeader from './AuthHeader'
import AuthSkeleton from "../skeleton/AuthSkeleton";

const AuthHeader = dynamic(() => import("./AuthHeader"), {
  loading: () => <AuthSkeleton/>,
  ssr: false
});
export default function Header() {
  return (
    <header className="bg-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Globe className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Tripo-Rio</h1>
        </div>
        <AuthHeader />
      </div>
    </header>
  );
}
