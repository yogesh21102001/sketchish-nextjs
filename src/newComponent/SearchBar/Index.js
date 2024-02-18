import React from "react";
import { SearchSVG } from "../../assets/svg";
import "./style.css";
export function SearchBar() {
  return (
    <>
      <div className="search-con">
        <input placeholder="search" className="search-section" />
        <SearchSVG className="Search-svg" />
      </div>
    </>
  );
}
