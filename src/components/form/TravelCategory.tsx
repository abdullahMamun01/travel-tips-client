/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { usePostStore } from "@/stores/postStore";

// Define the travel categories as constant
const categoryList = [
  "Adventure",
  "Cultural Travel",
  "Nature",
  "Urban Travel",
  "Luxury",
  "Family",
  "Wellness",
  "Business Travel",
  "Food & Culinary",
  "Historical",
  "Solo Travel",
  "Eco-Friendly Travel",
  "Cruises",
  "Road Trips",
  "Backpacking",
  "Photography",
  "Volunteer Travel",
  "Sports Travel",
  "Camping",
  "Pet-Friendly Travel",
];

type TravelCategoryProps = {
  formControl: Control<any>;
};

export default function TravelCategory({
  formControl,
}: TravelCategoryProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const { updatePost } = usePostStore();

  const category = updatePost?.categories?.toString() || ""; // Get the category or default to an empty string

  return (
    <div className="my-4">
      <Controller
        name="categories"
        control={formControl}
        rules={{ required: "Category is required" }}
        defaultValue={category} // Set the default value directly
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value || category}>
            <div className="mb-2">
              <Label className="">Select Category</Label>
            </div>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.categories && ( // Ensure you're checking errors correctly
        <p className="text-red-500">{errors.categories.message as string}</p>
      )}
    </div>
  );
}
