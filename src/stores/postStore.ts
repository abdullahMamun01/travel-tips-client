import { create } from "zustand";

type TPostMutate = {
  postId: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
};

type TPostState = {
  updatePost: TPostMutate | null;
  setPost: (post: TPostMutate) => void;
  selectPostId: string | null;
  setPostId: (postId: string) => void;
  clearPostId: () => void;
  clearPost: () => void;
};

export const usePostStore = create<TPostState>((set) => ({
  updatePost: null, // Initialize with null
  selectPostId: null,
  setPost: (post: TPostMutate) => set({ updatePost:post }),
  clearPost: () => set({ updatePost: null }),
  setPostId: (postId: string) => set({ selectPostId: postId }),
  clearPostId: () => set({ selectPostId: null }),
}));
