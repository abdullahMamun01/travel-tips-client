"use client";
import { useSearchStore } from "@/stores/searchStore";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";


import useDebounce from "@/hooks/useDebounce";

const SearchAndFilter: React.FC = () => {
  const { setFilters } = useSearchStore();
  const [search, setSearch] = useState("");



  const [debounceValue, debounceCB] = useDebounce<string>(1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceCB(e.target.value);
    setSearch(e.target.value);
  };



  useEffect(() => {
    if (debounceValue) {
      setFilters({ searchTerm: debounceValue });
    } else {
      setFilters({ searchTerm: "" });
    }
  }, [debounceValue]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearch}
        className="w-full"
        itemType="search"
      />
    </div>
  );
};

export default SearchAndFilter;
