export type TUserAdminAccess = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  isBlocked: boolean;
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

export type TPayment = {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  amount: number;
  paymentStatus: string;
  subscription: {
    _id: string;
    subscriptionType: string;
  };
  createdAt: string;
};
