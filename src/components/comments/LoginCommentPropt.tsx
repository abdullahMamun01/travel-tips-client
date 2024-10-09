"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { MessageCircle, LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginCommentPropt() {
  return (
    <Card className="w-full  mx-auto mt-1 overflow-hidden">
      <CardContent className="p-6">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Join the Conversation!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Log in to share your thoughts and connect with fellow travelers.
          </p>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <LogIn className="mr-2 h-4 w-4" />
              Log In to Comment
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
