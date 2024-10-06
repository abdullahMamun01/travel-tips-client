'use client'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'

export default function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search posts or users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full bg-white border-gray-300 focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 rounded-full"
          />
        </div>
  )
}
