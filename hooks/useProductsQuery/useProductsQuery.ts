import { useQuery } from '@tanstack/react-query';

import { axios, getProduct } from '@/utils';

export const useProductsQuery = (url: string) => {
  return useQuery({
    queryKey: ['products', url],
    queryFn: () => {
      return getProduct({
        api: axios,
        url: url,
      });
    },
    select: (data) => data.data,
  });
};
