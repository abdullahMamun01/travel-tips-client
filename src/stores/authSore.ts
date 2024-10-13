// stores/forgotPasswordStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
type TUser = {
  _id?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  image?: string;
  phone?: string;
  address?: string;
  location?:string ,
  isVerified: boolean ,
  bio?:string
};

type Token = string;
type TAuth = {
  user: TUser | null;
  token: Token | null;
};
type TAuthState = {
  auth: TAuth | null;
  setAuth: (auth: TAuth) => void;
};

const useAuth = create<TAuthState>()(
  persist(
    (set) => ({
      auth: null, // Initial state for auth
      setAuth: (authState: TAuth) => set({ auth: authState }), // Properly updating auth state
    }),
    {
      name: "auth", // Name of the item in local storage
     
    }
  )
);

export default useAuth;
