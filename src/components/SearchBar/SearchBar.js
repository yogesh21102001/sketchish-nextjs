import React, { useEffect, useState } from "react";
import { SearchSVG } from "../../assets/svg";
import DatalistInput from "react-datalist-input";
import { CloseBtnSVG } from "../../assets/ossvg";
import useProduct from "../../hooks/product/useProduct";
import "react-datalist-input/dist/styles.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ placeholder, setVal, valueForset, data, isHeader = false, value = "" }) {
  const [searchResult, setSearchResult] = useState([]);

  const { setSearchSuggestion } = useProduct();
  const [isCloseVisible, setCloseVisible] = useState(false);
  const [tags, setTags] = useState(value);
  // const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handelOnChange = async (e) => {
    setTags(e.target.value);
    const svalue = e.target.value;
    const data = await setSearchSuggestion({ search: svalue });
    if (data?.length > 0) setSearchResult(data);
    if (svalue?.length === 0) setSearchResult([]);
  };

  useEffect(() => {
    if (tags.length > 0) setCloseVisible(true);
    else setCloseVisible(false);
  }, [tags]);

  const handelClose = (e) => {
    setTags("");
  };

  const handelSelect = (item) => {
    navigate(`/icons`);
    setCloseVisible(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handelSelect({
        value: tags,
      });
    }
  };

  return (
    <div
      className="search-container"
      style={isHeader ? { width: "530px" } : {}}
    >
      <SearchSVG className="search-ico" onClick={() => { }} />

      <DatalistInput
        value={tags ? tags : ""}
        placeholder={placeholder}
        className="search-input"
        onSelect={handelSelect}
        onChange={handelOnChange}
        items={searchResult}
        onKeyDown={handleKeyPress}
      />

      {isCloseVisible && (
        <CloseBtnSVG className="search-ico" onClick={handelClose} />
      )}
    </div>
  );
}

export default SearchBar;
