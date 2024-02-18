import React from "react";
import './style.css';
import ReactPaginate from 'react-paginate';
export const PaginationBar = ({ currentPage, selectedPage, totalCount, handlePageClick, pageCount }) => {

    return (
        <div class="PaginationBar admin">
            {pageCount && <ReactPaginate
                forcePage={currentPage}
                containerClassName="pagination"
                breakLabel="..."
                nextLabel={<div className="pagination_btn"><span>Next</span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M7.5 4L13.5 10.5L7.5 17" stroke="#7238FA" stroke-width="2" />
                </svg></div>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<div className="pagination_btn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M13.5 4L7.5 10.5L13.5 17" stroke="#7238FA" stroke-width="2" />
                </svg><span>Prev</span></div>}
                renderOnZeroPageCount={null}
            />}
            {pageCount && <div className="pagination-count">
                <div className="pages">{currentPage}-{pageCount} of {totalCount?.toLocaleString()}</div>
            </div>}
        </div>
    );
};

