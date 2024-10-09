"use client"
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Bookmark, Clock, Compass, Settings, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
const categories = ["Beach", "City", "Mountain", "Food", "Culture"];

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState("All");


  return (
    <aside className="w-64 mr-8 hidden md:block ">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-teal-600 text-white p-4">
          <h2 className="text-xl font-semibold">Navigation</h2>
        </CardHeader>
        <CardContent className="p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Compass className="mr-2 h-4 w-4" />
              Explore
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bookmark className="mr-2 h-4 w-4" />
              Saved
            </Button>
          </nav>
          <Separator className="my-4" />
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={`w-full justify-start ${
                  selectedCategory === category
                    ? "bg-teal-100 text-teal-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </CardFooter>
      </Card>
    </aside>
  );
}
