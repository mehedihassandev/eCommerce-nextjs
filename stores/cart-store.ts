import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ICartItem } from '@/app/models/cart';

interface ICartStoreState {
  resetCart: () => void;
  cartItems: ICartItem[];
  addToCart: (product: ICartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create(
  persist<ICartStoreState>(
    (set) => ({
      cartItems: [],
      addToCart: (product: ICartItem) =>
        set((state) => {
          const existingProduct = state.cartItems.find(
            (item) => item.id === product.item?._id,
          );
          if (existingProduct) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.item?._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, product],
            };
          }
        }),
      removeFromCart: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (product) => product.id !== productId,
          ),
        })),
      updateQuantity: (productId: number, quantity: number) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        })),
      resetCart: () =>
        set(() => ({
          cartItems: [],
        })),
    }),
    {
      name: 'cart-storage', // NE-007: Name of the item in the storage (must be unique)
    },
  ),
);

useCartStore.subscribe((state) => {
  console.log('Cart-items', state.cartItems);
});
