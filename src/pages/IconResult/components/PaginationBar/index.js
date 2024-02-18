import React from "react";
import './style.css';

export const PaginationBar = ({ search, totalPages, totalCount, currentPages, tags, nextPages, previousPage, removeTag }) => {

    return (
        <div className="PaginationBar">
            {totalCount ? <div className="_23-icons-result">{totalCount?.toLocaleString()} Icons result {search ? <>
                for <span style={{ textTransform: "capitalize" }}>{search}</span>
            </> : ""}
            </div> : ''}
            <div className="tag-list">
                {tags.map(tag => <div className="tag">
                    <div className="body-1">{tag}</div>
                    <svg onClick={() => removeTag(tag)}
                        className="icon-close"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.3475 3.65271L7.94751 8.05273M3.65291 12.3473L7.94751 8.05273M7.94751 8.05273L3.54748 3.65271M7.94751 8.05273L12.3475 12.4528"
                            stroke="#676F7E"
                        />
                    </svg>
                </div>)}
            </div>
            {totalCount > 100 && <div className="result-pagination">
                <div className="_1-50-of-2-420">{Number(currentPages - 1) * 100 + 1}-{Number(currentPages) * 100} of {totalCount?.toLocaleString()}</div>
            </div>}

        </div>
    );
};

