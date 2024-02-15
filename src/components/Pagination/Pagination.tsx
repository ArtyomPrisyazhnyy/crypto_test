import React from 'react';
import './Pagination.scss';

export interface PaginationProps {
    page: number;
    next: () => void;
    prev: () => void;
    hasMore: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ page, hasMore, prev, next }) => {
    return (
        <div className="pagination">
            <button className="pagination__btn" onClick={prev} disabled={page === 0}>
                Prev
            </button>
            <button className="pagination__btn" onClick={next} disabled={!hasMore}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
