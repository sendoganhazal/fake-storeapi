'use client';

import React from 'react';
import { Paginator } from 'primereact/paginator';

interface PaginationProps {
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: { first: number; rows: number; page: number; pageCount: number }) => void;
}


const Pagination: React.FC<PaginationProps> = ({ first, rows, totalRecords, onPageChange }) => {
    const handlePageChange = (event: { first: number; rows: number; page: number; pageCount: number }) => {
    
    onPageChange(event);
  };
  return (
    <div className="paginator-wrapper">
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={handlePageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>
  );
};

export default Pagination;
