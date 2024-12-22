import { useQuery } from '@tanstack/react-query';

import { axios, getProducts } from '@/utils';

export const useProductsQuery = (url: string) => {
  return useQuery({
    queryKey: ['products', url],
    queryFn: () => {
      return getProducts({
        api: axios,
        url: url,
      });
    },
    select: (data) => data.data,
  });
};
