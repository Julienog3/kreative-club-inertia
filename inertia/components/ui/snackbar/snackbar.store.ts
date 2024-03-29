import { State } from "types";
import { create } from "zustand";

interface SnackbarItem {
  type: State;
  message: string;
}

type SnackbarItemWithId = {
  id: string;
} & SnackbarItem;

type SnackbarState = {
  items: SnackbarItemWithId[];
};

type SnackbarAction = {
  addItem: (item: SnackbarItem) => void;
  removeItem: (id: string) => void;
};

export const useSnackbarStore = create<SnackbarState & SnackbarAction>(
  (set) => ({
    items: [],
    addItem: (item) =>
      set((state) => ({
        items: [...state.items, { ...item, id: Date.now().toString() }],
      })),
    removeItem: (id) =>
      set((state) => {
        const notificationToRemoveIndex = state.items.findIndex(
          (item) => item.id === id,
        );

        if (notificationToRemoveIndex !== undefined) {
          const newItems = [...state.items];
          newItems.splice(notificationToRemoveIndex, 1);

          return {
            ...state,
            items: newItems,
          };
        }

        return state;
      }),
  }),
);

Date.now().toString();
