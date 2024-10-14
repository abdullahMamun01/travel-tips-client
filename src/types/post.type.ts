export interface IPost {
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
    isVerified: boolean;
  };
  upvotes: string[];
  downvotes: string[];
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
}
export type TPostBase = {
  title: string;
  description: string;
  images: string[];
  categories: string | string[];
};

export type TPost = TPostBase & {
  userId: string;
};

export type TPostMutate = TPostBase & {
  postId: string;
};

export interface IPostResponse {
  totalPage: number;
  page: number;
  hasNextPage: boolean;
  data: IPost[];
}

export type TSinglePostResponse = {
  success: boolean;
  message: string;
  statuscode: number;
  data: TSinglePost;
};

export type TSinglePost = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  title: string;
  description: string;
  images: string[];
  categories: string[];
  premium: boolean;
  createdAt: string;
  updatedAt: string;
};
