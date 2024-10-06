"use client";
import { Button } from "@/components/ui/button";

import { ArrowBigDown } from "lucide-react";
import React from "react";

type TDownvoteProps = {
  downvotes: number | string;
};

export default function DownVote({ downvotes }: TDownvoteProps) {


  return (
    <form action="" >
      <Button variant="ghost" className="text-red-600 hover:text-red-800 p-1">
        <ArrowBigDown className="h-6 w-6" />
        <span className="ml-1">{downvotes}</span>
      </Button>
    </form>
  );
}
