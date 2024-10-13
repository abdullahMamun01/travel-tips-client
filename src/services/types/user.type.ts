export type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  address: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  image?: string;
  bio?: string;
};

// export type TPost = {
//   _id: string;
//   title: string;
//   description: string;
//   images: string[];
//   categories: string[];
//   premium: boolean;
//   createdAt: string;
//   updatedAt: string;
//   user: string;
// };
export type TPost = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
  premium: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
    isVerifeid: boolean
  };
  
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
};
// type SocialLinks = {
//   facebook?: string;
//   twitter?: string;
//   instagram?: string;
//   linkedin?: string;
// }

export type TProfileUpdate = {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  // socialLinks?: SocialLinks;
};
export type TProfileUpdatePayload = {
  token: string;
  body: FormData;
};

export type TFollowUnfollow = {
  userId: string;
  token: string;
};
