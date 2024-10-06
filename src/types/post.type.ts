export interface IPost {
  _id: string;
  userId: string;
  title: string;
  description: string;
  images: string[]; // Assuming it's an array of image URLs or paths
  categories: string[]; // Assuming categories are strings, could also be an array of objects if they have more data
  premium: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  upvoteCount: number;
  downvoteCount: number;
  commentCount: number;
}


export type TPost = {
  userId : string,
  title: string ,
  description: string ,
  images : string [],
  categories : string[] ,
  
}



export interface IPostResponse {
  totalPage: number;
  page:number ,
  data : IPost[]
}
