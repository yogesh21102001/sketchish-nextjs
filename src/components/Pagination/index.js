import React from "react";
import './style.css'
export const Pagination = ({ onNextClick, onPrevClick, currentPage, totalPages, totalCount }) => {
    const Pagination = (
        <div className="pagination">
            <div className="pages">{currentPage}-{totalPages} of {totalCount?.toLocaleString()}</div>

            <svg
                className="icon-arrow-left"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onPrevClick}
            >
                <rect className="svgBack" width="30" height="30" rx="15" fill="#E3E4E7" />
                <path d="M17 10L12 15L17 20" stroke="#2F3037" strokeWidth="2" />
            </svg>

            <svg
                className="icon-arrow-right"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={onNextClick}
            >
                <rect className="svgBack" width="30" height="30" rx="15" fill="#E3E4E7" />
                <path d="M12 10L17 15L12 20" stroke="#2F3037" strokeWidth="2" />
            </svg>
        </div>
    );

    return Pagination;
};