"use client";
import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import imageUrlParser from "@/lib/imageUrlParser";
import useAuth from "@/stores/authSore";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
type TAvatarProps = {
  name: string;
  image?: string;
  isVerified?: boolean;
  userId: string;
};

export function Avatar({ image, name, isVerified, userId }: TAvatarProps) {
  const { auth } = useAuth();

  const imageUrl = image
    ? imageUrlParser(image)
    : `https://api.dicebear.com/6.x/initials/svg?seed=${name.slice(0, 1)}`;

  const herf = auth?.user?._id === userId ? `/profile` : `/profile/${userId}`;

  return (
    <div className="relative mx-auto">
      <Link href={herf}>
        <AvatarUI>
          <AvatarImage src={imageUrl} alt="@shadcn" />
          <AvatarFallback>{name}</AvatarFallback>
        </AvatarUI>
        {isVerified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <CheckCircle className="h-3 w-3 text-white" />
          </div>
        )}
      </Link>
    </div>
  );
}
