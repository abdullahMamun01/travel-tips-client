"use client";
import React from "react";

import {
  Award,
  Bookmark,
  Clock,

  Globe,
  History,
  Map,
  MessageSquare,
  PenTool,
  PlusCircle,
  Tag,

} from "lucide-react";
import { Button } from "../ui/button";
import categoryList from "@/lib/categoris";

export default function Sidebar() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" />
              Explore Destinations
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <PlusCircle className="mr-2 h-4 w-4" />
              Plan New Trip
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            {categoryList?.map((category ,i) => (
              <Button key={i} variant="ghost" className="w-full justify-start">
                <Map className="mr-2 h-4 w-4" />
                {category}
              </Button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Interact
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Discussions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Tag className="mr-2 h-4 w-4" />
              Tags
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              Top Contributors
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Activity
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <PenTool className="mr-2 h-4 w-4" />
              Submit a Post
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bookmark className="mr-2 h-4 w-4" />
              Bookmarks
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Recent Views
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
