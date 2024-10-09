import { create } from "zustand";

type TCommentMutate = {
  commentId: string;
  comment: string;
};

type TCommentState = {
  selectedComment: TCommentMutate | null;
  deleteCommentId: string | null;
  setComment: (comment: TCommentMutate) => void;
  setDeleteCommentId: (commentId: string) => void;
  clearComment: () => void;
};

export const useCommentStore = create<TCommentState>((set) => ({
  selectedComment: null,
  deleteCommentId: null,
  setComment: (comment: TCommentMutate) => set({ selectedComment: comment }),
  setDeleteCommentId: (commentId: string) => set({ deleteCommentId: commentId }),
  clearComment: () => set({ selectedComment: null, deleteCommentId: null }),
}));
