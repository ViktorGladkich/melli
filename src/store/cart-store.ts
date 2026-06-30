import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShopifyCart } from '@/lib/shopify';

export type CartItem = {
  id: string; // The CartLine ID from Shopify
  variantId: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
  variantTitle: string;
  handle?: string;
};

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  setCart: (cart: ShopifyCart | null | undefined) => void;
  addItem: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  initCart: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      setCart: (cart: ShopifyCart | null | undefined) => {
        if (!cart) return;
        
        const items = cart.lines?.edges?.map(({ node }: { node: ShopifyCart['lines']['edges'][0]['node'] }) => {
          const product = node.merchandise.product;
          return {
            id: node.id,
            variantId: node.merchandise.id,
            title: product.title,
            price: node.merchandise.price.amount,
            quantity: node.quantity,
            image: node.merchandise.image?.url || '',
            variantTitle: node.merchandise.title !== 'Default Title' ? node.merchandise.title : '',
            handle: product.handle,
          };
        }) || [];

        set({
          cartId: cart.id,
          checkoutUrl: cart.checkoutUrl,
          items,
          isLoading: false
        });
      },

      initCart: async () => {
        const { cartId, setCart } = get();
        if (cartId) {
          try {
            const res = await fetch(`/api/cart?cartId=${cartId}`);
            if (res.ok) {
              const cart = await res.json();
              if (cart && cart.id) {
                setCart(cart);
              } else {
                set({ cartId: null, checkoutUrl: null, items: [] });
              }
            }
          } catch (e) {
            console.error(e);
          }
        }
      },

      addItem: async (variantId: string, quantity: number) => {
        set({ isLoading: true });
        const { cartId, setCart, openCart } = get();
        
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId,
              lines: [{ merchandiseId: variantId, quantity }]
            })
          });
          
          if (res.ok) {
            const cart = await res.json();
            setCart(cart);
            openCart();
          } else {
             set({ isLoading: false });
          }
        } catch (error) {
          console.error("Failed to add item to cart", error);
          set({ isLoading: false });
        }
      },

      removeItem: async (lineId: string) => {
        set({ isLoading: true });
        const { cartId, setCart } = get();
        if (!cartId) return;

        try {
          const res = await fetch('/api/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId,
              lineIds: [lineId]
            })
          });
          
          if (res.ok) {
            const cart = await res.json();
            setCart(cart);
          } else {
             set({ isLoading: false });
          }
        } catch (error) {
          console.error("Failed to remove item", error);
          set({ isLoading: false });
        }
      },

      updateQuantity: async (lineId: string, quantity: number) => {
        set({ isLoading: true });
        const { cartId, setCart } = get();
        if (!cartId) return;

        try {
          const res = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId,
              lines: [{ id: lineId, quantity }]
            })
          });
          
          if (res.ok) {
            const cart = await res.json();
            setCart(cart);
          } else {
             set({ isLoading: false });
          }
        } catch (error) {
          console.error("Failed to update quantity", error);
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);
