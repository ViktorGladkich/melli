import { create } from 'zustand';

export type QuickAddProduct = {
  id: string;
  handle: string;
  brand: string;
  title: string;
  price: string;
  image: string;
};

interface QuickAddState {
  isOpen: boolean;
  product: QuickAddProduct | null;
  openQuickAdd: (product: QuickAddProduct) => void;
  closeQuickAdd: () => void;
}

export const useQuickAddStore = create<QuickAddState>((set) => ({
  isOpen: false,
  product: null,
  openQuickAdd: (product) => set({ isOpen: true, product }),
  closeQuickAdd: () => set({ isOpen: false, product: null }),
}));
