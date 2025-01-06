import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ICartItem } from '@/app/models/cart';

interface IWhitelistStoreState {
  resetWhitelist: () => void;
  whitelistItems: ICartItem[];
  addToWhitelist: (product: ICartItem) => void;
  removeFromWhitelist: (productId: number) => void;
  toggleWhitelistItem: (product: ICartItem) => void;
}

export const useWhitelistStore = create(
  persist<IWhitelistStoreState>(
    (set) => ({
      whitelistItems: [],
      toggleWhitelistItem: (product: ICartItem) =>
        set((state) => {
          const existingProduct = state.whitelistItems.find(
            (item) => item.id === product.id,
          );
          if (existingProduct) {
            return {
              whitelistItems: state.whitelistItems.filter(
                (item) => item.id !== product.id,
              ),
            };
          } else {
            return {
              whitelistItems: [...state.whitelistItems, product],
            };
          }
        }),
      addToWhitelist: (product: ICartItem) =>
        set((state) => ({
          whitelistItems: [...state.whitelistItems, product],
        })),
      removeFromWhitelist: (productId: number) =>
        set((state) => ({
          whitelistItems: state.whitelistItems.filter(
            (product) => product.id !== productId,
          ),
        })),
      resetWhitelist: () =>
        set(() => ({
          whitelistItems: [],
        })),
    }),
    {
      name: 'whitelist-storage', // Name of the item in the storage (must be unique)
    },
  ),
);

useWhitelistStore.subscribe((state) => {
  console.log('Whitelist-items', state.whitelistItems);
});
