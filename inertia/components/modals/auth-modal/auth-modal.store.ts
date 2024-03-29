import { create } from "zustand";
import { AuthModalType } from "./auth-modal";

interface AuthModalState {
  isShowed: boolean;
  type: AuthModalType | undefined;
  openModal: (type: AuthModalType) => void;
  closeModal: () => void;
  changeModalType: (type: AuthModalType) => void;
}

export const useStoreAuthModal = create<AuthModalState>((set) => ({
  isShowed: false,
  type: undefined,
  openModal: (type: AuthModalType) => set(() => ({ isShowed: true, type })),
  closeModal: () => set(() => ({ isShowed: false })),
  changeModalType: (type: AuthModalType) =>
    set((state) => ({ ...state, type })),
}));
