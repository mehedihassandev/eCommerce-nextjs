import React, { FC } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ICustomPaginationProps {
  count: number;
  limit: number;
  offset: number;
  handlePrev: () => void;
  handleNext: () => void;
  setOffset: (offset: number) => void;
}

export const CustomPagination: FC<ICustomPaginationProps> = ({
  count,
  limit,
  offset,
  handlePrev,
  handleNext,
  setOffset,
}) => {
  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={handlePrev}
            className="font-playfair text-lg"
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(count / limit) }).map((_, index) => {
          if (
            index === 0 ||
            index === Math.ceil(count / limit) - 1 ||
            (index >= offset / limit - 2 && index <= offset / limit + 2)
          ) {
            return (
              <PaginationItem key={index} className="cursor-pointer">
                <PaginationLink
                  isActive={index === offset / limit}
                  onClick={() => setOffset(index * limit)}
                  className="font-noto text-sm"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return <PaginationEllipsis key={index} />;
        })}
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={handleNext}
            className="font-playfair text-lg"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
