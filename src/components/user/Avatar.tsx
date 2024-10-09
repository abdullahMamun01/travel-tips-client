import {
  Avatar as AvatarUI,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import imageUrlParser from "@/lib/imageUrlParser";
type TAvatarProps = {
  name: string;
  image?: string | undefined;
};

export function Avatar({ image, name }: TAvatarProps) {

  const imageUrl = image
    ? imageUrlParser(image)
    : `https://api.dicebear.com/6.x/initials/svg?seed=${name.slice(0, 1)}`;

  return (
    <AvatarUI>
      <AvatarImage src={imageUrl} alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </AvatarUI>
  );
}
