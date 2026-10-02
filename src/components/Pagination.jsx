import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50],
  itemName = 'records'
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  if (totalItems === 0) return null;

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalItems);

  // Generate pagination items with clean ellipsis logic
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="custom-pagination-container">
      {/* Left Summary: Showing X–Y of Z records */}
      <div className="pagination-summary">
        <span className="pagination-summary-text">
          Showing <span className="pagination-count-highlight">{startRecord}–{endRecord}</span> of{' '}
          <span className="pagination-count-highlight">{totalItems.toLocaleString()}</span> {itemName}
        </span>

        {onPageSizeChange && pageSizeOptions && pageSizeOptions.length > 0 && (
          <div className="pagination-page-size-picker">
            <span className="pagination-page-size-label">Rows per page:</span>
            <select
              className="pagination-page-size-select"
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              aria-label="Select rows per page"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Controls: [ ← Previous ] [ 1 ] [ 2 ] [ 3 ] [ ... ] [ 52 ] [ Next → ] */}
      <div className="pagination-button-group" role="navigation" aria-label="Pagination Navigation">
        {/* Previous Button */}
        <button
          className="pagination-nav-btn"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeft size={14} className="pagination-icon" />
          <span className="pagination-text-nav">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="pagination-numbers-list">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  …
                </span>
              );
            }
            const isCurrent = p === currentPage;
            return (
              <button
                key={p}
                className={`pagination-number-btn ${isCurrent ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="pagination-nav-btn"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          title="Next page"
        >
          <span className="pagination-text-nav">Next</span>
          <ChevronRight size={14} className="pagination-icon" />
        </button>
      </div>
    </div>
  );
}
