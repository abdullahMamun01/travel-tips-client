import React, { ReactNode } from "react";
import Header from "../Header/Header";

import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
type TRootLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: TRootLayoutProps) {
  return (
    <div className="">
      <Header />
      <div className="flex min-h-screen w-full bg-background">
        <div className="w-16 sm:w-64 p-2 sm:p-4 border-r">
          <Sidebar />
        </div>
        <div className="flex-1 border-r overflow-y-auto">
          {children}
        </div>
        <div className="hidden lg:flex flex-col w-80 p-4 gap-6 overflow-y-auto ">
          <RightSidebar/>
        </div>
      </div>
    </div>
  );
}
