
import Comment from '@/components/comments/Comment'
import CommentList from '@/components/comments/CommentList'
import PostComments from '@/components/post/PostDetails/PostComments'
import PostDetailsHeader from '@/components/post/PostDetails/PostDetailsHeader'
import PostOverviewCard from '@/components/post/PostDetails/PostOverviewCard'
import React from 'react'




export default function PostDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <PostDetailsHeader/>
        <main className="container mx-auto px-4 py-8">
            <PostOverviewCard/>
            {/* <PostComments/> */}

            <CommentList/>
        </main>
    </div>
  )
}
