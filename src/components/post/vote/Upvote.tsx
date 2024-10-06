'use client'
import { Button } from '@/components/ui/button'
import { ArrowBigUp } from 'lucide-react'
import React from 'react'

type TUpvoteProps = {
    upvotes : number | string 
}
export default function Upvote({upvotes} : TUpvoteProps) {
  return (
    <Button
    variant="ghost"
    className="text-teal-600 hover:text-teal-800 p-1"
  >
    <ArrowBigUp className="h-6 w-6" />
    <span className="ml-1">{upvotes}</span>
  </Button>
  )
}
