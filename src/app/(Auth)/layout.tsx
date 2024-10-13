"use client";
import AuthTabs from "@/components/auth/AuthTabs";

import { MapPin, Palmtree, Plane } from "lucide-react";




import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {


  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden w-1/2 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center lg:block">
        <div className="flex h-full items-center justify-center bg-black/20">
          <div className="text-center text-white">
            <h1 className="mb-4 text-5xl font-bold">Explore the World</h1>
            <p className="text-xl">
              Share your adventures. Discover new destinations.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center space-x-2">
              <Plane className="h-12 w-12 text-primary" />
              <Palmtree className="h-12 w-12 text-primary" />
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Welcome to TravelTips
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your passport to amazing travel experiences
            </p>
          </div>
          <div className="mt-6">
            <AuthTabs/>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
