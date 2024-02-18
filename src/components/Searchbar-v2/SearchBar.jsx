import React, { useEffect, useState } from "react";
import { DatalistInput, useComboboxControls } from "react-datalist-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchSVG } from "../../assets/svg";
import { CloseBtnSVG } from "../../assets/ossvg";
import useProduct from "../../hooks/product/useProduct";
import "react-datalist-input/dist/styles.css";
import Styles from "./style.module.css";

function SearchBar({ className, placeholder, defaultValue }) {
  const { isExpanded, setIsExpanded, value, setValue } = useComboboxControls({
    isExpanded: true,
    initialValue: defaultValue,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchSuggestion } = useProduct();
  const [searchResult, setSearchResult] = useState([]);
  const [isCloseVisible, setCloseVisible] = useState(false);
  const navigate = useNavigate();
  const scrollTop = (v) => {
    window.scrollTo({
      top: 0,
      behavior: v || "instant",
    });
  };
  const handelOnChange = async (e) => {
    const svalue = e.target.value;
    // handelSelect(e.target.value);
    if (!svalue.includes("\\")) {
      const data = await setSearchSuggestion({ search: svalue });
      if (data?.length > 0) setSearchResult(data);
      if (svalue?.length === 0) setSearchResult([]);
    }else{
      setValue("");
    }
  };
  const handelClose = (e) => {
    searchParams.delete("search");
     searchParams.delete("p");
      searchParams.delete("s");
       searchParams.delete("t");
    setSearchParams(searchParams);
    setValue("");
  };
  const handelSelect = (value) => {
    searchParams.delete("p");
    searchParams.delete("search");
    navigate(`/icons?search=${value}`);
    // if (searchParams?.size > 0){
    // }else{
    //    navigate(`/icons?=${value}`);
    // }
    setCloseVisible(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      scrollTop()
      handelSelect(value);
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    if (value) setCloseVisible(true);
    else setCloseVisible(false);
  }, [value]);

  return (
    <div className={`${Styles.search_container} ${className}`}>
      <div className={Styles.lft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.6667 7.33333C12.6667 8.80146 12.0735 10.131 11.1137 11.0955C10.1478 12.066 8.81072 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
            stroke="#1E3050"
            stroke-width="2"
          />
          <path
            d="M11.1147 11.0957L14.199 14.1974"
            stroke="#1E3050"
            stroke-width="2"
          />
        </svg>
        <DatalistInput
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          value={value}
          setValue={setValue}
          placeholder={placeholder || "Search"}
          onSelect={(e) => handelSelect(e?.value)}
          onChange={handelOnChange}
          items={searchResult}
          onKeyDown={handleKeyPress}
          className={Styles.input_box}
          aria-autocomplete="none"
        />
      </div>
      <div className={Styles.rgt}>
        {isCloseVisible && (
          <svg
            style={{ cursor: "pointer" }}
            onClick={handelClose}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="8" cy="8" r="8" fill="#676F7E" />
            <path
              d="M10.4 5.60022L7.97094 8.0293M5.60007 10.4002L7.97094 8.0293M7.97094 8.0293L5.54187 5.60022M7.97094 8.0293L10.4 10.4584"
              stroke="white"
              stroke-linecap="square"
              stroke-linejoin="round"
            />
          </svg>
          // <CloseBtnSVG color={'black'} className="search-ico close" onClick={handelClose} />
        )}

        {value && (
          <div
            className={Styles.search_btn}
            onClick={() => {
              if (value) handelSelect(value);
              setIsExpanded(false);
            }}
          >
            <svg
              className="icon-sign-in"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_11083_7032)">
                <path
                  d="M11.3478 17L18.5 10M18.5 10L11.3478 3M18.5 10L-8.34743e-08 10"
                  stroke="#1E3050"
                  strokeWidth="2"
                />
              </g>
              <defs>
                <clipPath id="clip0_11083_7032">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 20) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;