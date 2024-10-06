import { create } from "zustand";

type TPostMutate = {
  postId: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
};

type TPostState = {
  post: TPostMutate | null;
  updatePost: (post: TPostMutate) => void;
  selectPostId: string | null;
  setPostId: (postId: string) => void;
  clearPostId: () => void;
  clearPost: () => void;
};

export const usePostStore = create<TPostState>((set) => ({
  post: null, // Initialize with null
  selectPostId: null,
  updatePost: (post: TPostMutate) => set({ post }),
  clearPost: () => set({ post: null }),
  setPostId: (postId: string) => set({ selectPostId: postId }),
  clearPostId: () => set({ selectPostId: null }),
}));
