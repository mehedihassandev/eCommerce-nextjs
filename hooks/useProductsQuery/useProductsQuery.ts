import { axios, getProducts } from '@/utils';
import { useQuery } from '@tanstack/react-query';

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
