
type TUer = {
    _id: string;
    firstName: string;
    lastName: string;
    image?:string
  };

export type TComment = {
  _id: string;
  post: string;
  user: TUer;
  comment: string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[] | [];
};

export type Reply = {
  _id: string;
  user: TUer
  reply: string;
  createdAt: string;
  updatedAt: string;
};


export type TCommentFormValue = {
  comment : string
}