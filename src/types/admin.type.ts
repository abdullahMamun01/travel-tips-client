export type TUserAdminAccess  = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    isVerified: boolean;
    role: string
  };


  export type TPostAdminAccess = {
    _id: string;
    title: string;
    createdAt: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  };