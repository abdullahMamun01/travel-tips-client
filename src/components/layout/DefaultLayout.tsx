import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";
import SearchBox from "../serach/SearchBox";

type TRootLayoutProps = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: TRootLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 w-full">
      <Header />

      <div className="flex flex-1 pt-16">
        <aside className="w-64 max-md:hidden bg-white border-r border-gray-200 fixed h-full overflow-y-auto top-16">
          <Sidebar />
        </aside>
        <main className="max-md:m-0 flex-1 p-6 ml-64">
          <SearchBox />
          {children}
        </main>
      </div>
    </div>
  );
}
