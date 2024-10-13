import { create } from "zustand";

type TModalState = {
  isOpen: boolean;

  setOpenModal: () => void;
  setCloseModal: () => void;
  toggleModal: () => void;
};

export const useModal = create<TModalState>((set) => ({
  isOpen: false,
  setOpenModal: () => set({ isOpen: true }),
  setCloseModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
