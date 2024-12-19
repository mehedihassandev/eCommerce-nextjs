import { IProduct } from '@/app/models/products';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ICartStoreState {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: number) => void;
}

export const useCartStore = create(
  persist<ICartStoreState>(
    (set) => ({
      cartItems: [],
      addToCart: (product: IProduct) =>
        set((state) => ({ cartItems: [...state.cartItems, product] })),
      removeFromCart: (productId: number) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (product) => product.id !== productId,
          ),
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
