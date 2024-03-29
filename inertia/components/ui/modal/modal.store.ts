import { create } from "zustand";

interface ModalState {
  isShowed: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useStoreModal = create<ModalState>((set) => ({
  isShowed: false,
  openModal: () => set(() => ({ isShowed: true })),
  closeModal: () => set(() => ({ isShowed: false })),
}));
