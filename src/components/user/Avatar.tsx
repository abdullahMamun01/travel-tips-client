
import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import imageUrlParser from "@/lib/imageUrlParser";

import { CheckCircle } from "lucide-react";
type TAvatarProps = {
  name: string;
  image?: string | undefined;
  isVerified?: boolean;
};

export function Avatar({ image, name, isVerified = false }: TAvatarProps) {

  const imageUrl = image
    ? imageUrlParser(image)
    : `https://api.dicebear.com/6.x/initials/svg?seed=${name.slice(0, 1)}`;

  return (
    <div className="relative">
      
      <AvatarUI>
        <AvatarImage src={imageUrl} alt="@shadcn" />
        <AvatarFallback>{name}</AvatarFallback>
      </AvatarUI>
      {isVerified && (
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
          <CheckCircle className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
}
