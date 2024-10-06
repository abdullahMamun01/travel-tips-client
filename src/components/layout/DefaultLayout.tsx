
import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";



type TRootLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: TRootLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header/>
      <div className="container mx-auto px-4 py-8 flex w-full">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
