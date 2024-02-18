import React, { useState, useRef } from "react";
import Styles from "./style.module.css";
import SearchBar from "../Searchbar-v2/SearchBar";
import CustomDropDown from "../custom-dropdown/CustomDropDown";

const SearchAndFilterBar = ({
  sortBy,
  setSortBy,
  handleBucket,
  isBucket,
  defaultSearchValue,
  isAuthenticated,
  setFilter,
  isFilter,
  setIsBcket,
}) => {
  const windowWidth = useRef(window.innerWidth);

  const hendelFilter = () => {
    if (windowWidth.current <= 600) {
      setFilter(!isFilter);
      setIsBcket(false);
    }
  };

  return (
    <div className={Styles.search_and_filter_bar_wraper}>
      <div className={Styles.search_and_filter_bar}>
        <div className={Styles.lft} onClick={hendelFilter}>
          <div className={Styles.filter_btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 10.96V18M10 10.96L17 2H3L10 10.96Z"
                stroke="#1E3050"
                stroke-width="1.8"
                stroke-linecap="square"
              />
            </svg>
            <p>FILTER</p>
          </div>
        </div>
        <div className={Styles.mid}>
          <SearchBar
            className={Styles.search_bar}
            defaultValue={defaultSearchValue}
          />
          <CustomDropDown
            className={Styles.custom_dropdown}
            width={"5rem"}
            lable={"Demo"}
            options={["RECENT", "A-Z"]}
            value={sortBy}
            onSelect={setSortBy}
            dropdownWidth={"8rem"}
          />
        </div>
        <div className={Styles.rgt} onClick={() => handleBucket(!isBucket)}>
          <div className={Styles.bucket_txt}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.99986 7C2.99986 7 1.33173 14.3856 5.32559 17C8.37564 18.9966 11.6092 18.995 14.6603 17C18.6564 14.3871 16.9999 7 16.9999 7"
                stroke="#1E3050"
                stroke-width="1.8"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
              <path
                d="M1 7H19"
                stroke="#1E3050"
                stroke-width="1.8"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
              <path
                d="M5.1001 6C5.56337 3.71776 7.58112 2 10.0001 2C12.419 2 14.4368 3.71776 14.9001 6"
                stroke="#1E3050"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>MY BUCKET</p>
          </div>
          <svg
            className={!isBucket ? Styles.menu_flip : ""}
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.6743 9.38648L19.0379 8.75009L20.3107 7.47729L20.9471 8.11369L27.1971 14.3637L27.8335 15.0001L27.1971 15.6365L20.9471 21.8865L20.3107 22.5229L19.0379 21.2501L19.6743 20.6137L25.2879 15.0001L19.6743 9.38648ZM3.4357 10.3501H2.5357V12.1501H3.4357H15.6228H16.5228V10.3501H15.6228H3.4357ZM3.4357 17.8501H2.5357V19.6501H3.4357H15.623H16.523V17.8501H15.623H3.4357ZM3.4732 14.1001H4.3732H16.8732H17.7732V15.9001H16.8732H4.3732H3.4732V14.1001Z"
              fill="#1E3050"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
