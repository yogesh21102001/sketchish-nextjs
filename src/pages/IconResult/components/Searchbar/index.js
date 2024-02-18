import React, { useEffect, useState } from "react";
import { DatalistInput, useComboboxControls } from "react-datalist-input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchSVG } from "../../../../assets/svg";
import { CloseBtnSVG } from "../../../../assets/ossvg";
import useProduct from "../../../../hooks/product/useProduct";
import "react-datalist-input/dist/styles.css";
import './style.css';

export function SearchBar({ className, placeholder, defaultValue = "" }) {
  const { isExpanded, setIsExpanded, value, setValue } = useComboboxControls({ isExpanded: true, value: defaultValue });
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
    searchParams.delete('search')
    setSearchParams(searchParams)
    setValue("");
  };
  const handelSelect = ({ value }) => {
    searchParams.delete('p')
    searchParams.delete('search')
    navigate(`/icons?t=Classic&s=standard&search=${value}`);
    setCloseVisible(true);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSelect({ value });
      setIsExpanded(false)
    }
  };
  useEffect(() => {
    if (value) setCloseVisible(true);
    else setCloseVisible(false);
  }, [value]);

  return (
    <div className={`search-container ${className}`}>
      <SearchSVG className="search-ico" onClick={() => { }} />
      <DatalistInput
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        value={value}
        setValue={setValue}
        placeholder={placeholder || "Search icons..."}
        className="search-input"
        onSelect={handelSelect}
        onChange={handelOnChange}
        items={searchResult}
        onKeyDown={handleKeyPress}
      />
      {isCloseVisible && (
        <svg
          onClick={handelClose}
          className="icon-close-circle"
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
      <div className="search-container-button" onClick={() => {
        if (value)
          handelSelect({ value });
        setIsExpanded(false)
      }}>
        <div className="search-container-button2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 16L16 10L10 4" stroke="#1E3050" stroke-width="2" />
            <path d="M16 10L2 10" stroke="#1E3050" stroke-width="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

