import React, { useEffect, useState } from "react";
import { DatalistInput, useComboboxControls } from "react-datalist-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchSVG } from "../../../../assets/svg";
import { CloseBtnSVG } from "../../../../assets/ossvg";
import useProduct from "../../../../hooks/product/useProduct";
import "react-datalist-input/dist/styles.css";
import Styles from "./style.module.css";

export function SearchBar({ className, placeholder, defaultValue }) {
  const { isExpanded, setIsExpanded, value, setValue } = useComboboxControls({
    isExpanded: true,
    initialValue: defaultValue,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchSuggestion } = useProduct();
  const [searchResult, setSearchResult] = useState([]);
  const [isCloseVisible, setCloseVisible] = useState(false);
  const navigate = useNavigate();
  const handelOnChange = async (e) => {
    const svalue = e.target.value;
    const data = await setSearchSuggestion({ search: svalue });
    if (data?.length > 0) setSearchResult(data);
    if (svalue?.length === 0) setSearchResult([]);
  };
  const handelClose = (e) => {
    searchParams.delete("search");
    setSearchParams(searchParams);
    setValue("");
  };
  const handelSelect = ({ value }) => {
    searchParams.delete("p");
    searchParams.delete("search");
    navigate(`/icons?${searchParams.toString()}&search=${value}`);
    setCloseVisible(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSelect({ value });
      setIsExpanded(false);
    }
  };
  useEffect(() => {
    if (value) setCloseVisible(true);
    else setCloseVisible(false);
  }, [value]);

  return (
    <div className={`${Styles.search_container} ${className}`}>
      {!value && <SearchSVG onClick={() => {}} />}
      <DatalistInput
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        value={value}
        setValue={setValue}
        placeholder={placeholder || "Search icons..."}
        onSelect={handelSelect}
        onChange={handelOnChange}
        items={searchResult}
        onKeyDown={handleKeyPress}
        className={Styles.input_box}
        aria-autocomplete="none"
      />
      {isCloseVisible && (
        <svg
          onClick={handelClose}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" fill="#676F7E" />
          <path
            d="M16.3474 7.65271L11.9474 12.0527M7.65279 16.3473L11.9474 12.0527M11.9474 12.0527L7.54736 7.65271M11.9474 12.0527L16.3474 16.4528"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        // <CloseBtnSVG color={'black'} className="search-ico close" onClick={handelClose} />
      )}

      {value && (
        <div
          className={Styles.search_btn}
          onClick={() => {
            if (value) handelSelect({ value });
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
  );
}
