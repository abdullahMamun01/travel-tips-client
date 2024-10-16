"use client";
import { useSearchStore } from "@/stores/searchStore";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import categoryList from "@/lib/categoris";
import useDebounce from "@/hooks/useDebounce";

const SearchAndFilter: React.FC = () => {
  const { setFilters, filters } = useSearchStore();
  const [search, setSearch] = useState("");

  const { sortBy } = filters;

  const [debounceValue, debounceCB] = useDebounce<string>(1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceCB(e.target.value);
    setSearch(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    if(category === 'All'){
      setFilters({ selectedCategory: '' })
    }else
    setFilters({ selectedCategory: category });
  };

  const handleSortChange = (option: string) => {
    setFilters({ sortBy: option });
  };

  // Example categories and sort options
  const categories = categoryList;
  const sortOptions = ["Most Upvoted"];

  useEffect(() => {
    if (debounceValue) {
      setFilters({ searchTerm: debounceValue });
    } else {
      setFilters({ searchTerm: "" });
    }
  }, [debounceValue]);

  return (
    <div className="grid grid-cols-12 max-md:grid-cols-1 gap-4 mb-8">
      <div className="col-span-8 ">
        <Input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={handleSearch}
          className="w-full"
          itemType="search"
        
        />
      </div>
      <div className="col-span-4 flex gap-4 flex-1 w-full">
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={categories[0]}
        >
          <SelectTrigger
            defaultValue={categories[0]}
            className="w-full md:w-[180px]"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem key="All" value="All">
              All
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleSortChange} defaultValue={sortBy}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndFilter;
