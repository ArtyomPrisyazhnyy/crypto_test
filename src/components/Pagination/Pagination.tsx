import React from 'react';

import styles from './Pagination.module.scss'

interface PaginationProps {
    page: number;
    onPageChange: (newPage: number) => void;
    hasMore: boolean;
  }

const Pagination: React.FC<PaginationProps> = ({ page, onPageChange, hasMore }) => {
    return (
            <div className={styles.pagination}>
                <button className={styles.pagination__btn} onClick={() => onPageChange(page - 1)} disabled={page === 0}>Назад</button>
                <button className={styles.pagination__btn} onClick={() => onPageChange(page + 1)} disabled={!hasMore}>Далее</button>
            </div>
    );
};

export default Pagination;
