import { create } from 'zustand';

export type CartItem = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
  variant: string;
};

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  items: [
    {
      id: "1",
      title: "Melli Signature",
      price: "12,00 €",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1584820927508-0138ffbc74b8?auto=format&fit=crop&q=80&w=400",
      variant: "Premium",
    },
    {
      id: "2",
      title: "Melli Classic",
      price: "8,50 €",
      quantity: 2,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
      variant: "Standard",
    }
  ],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) => 
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) => 
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) => 
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) => 
    set((state) => ({
      items: state.items.map((i) => 
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    })),
}));
