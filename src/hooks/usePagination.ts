import { useState, useEffect } from 'react';

export function usePagination(items: any[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reset page when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems
  };
}