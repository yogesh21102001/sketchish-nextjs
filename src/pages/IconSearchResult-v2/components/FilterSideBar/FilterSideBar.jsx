import React, { useState, useEffect } from "react";
import Styles from "./styles.module.css";
import { FilterOptions } from "../filterOptions/FilterOptions";

import { FreeIcon, LogosIcon, PaidIcon, AllIcon } from "../../assets/icons";

import { useNavigate, useSearchParams } from "react-router-dom";

export const FilterSideBar = ({
  setPage,
  currentWondow,
  isFilter,
  isAllStyles,
  setIsAllStyles,
  combinedPairs,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("t");
  const style = searchParams.get("s");
  const [selectedType, setSelectedType] = useState('');
  const [selectedStyleSet, setSelectedStyleSet] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const memberShip = searchParams.get("m");

  const navigate = useNavigate();

  useState(() => {
    if (memberShip?.toLowerCase() == "free") {
      setIsFree(true);
    }
    if (memberShip?.toLowerCase() == "paid") {
      setIsPaid(true);
    }
  }, []);

  useEffect(() => {

    if(type && style){
      setSelectedStyleSet(style);
      setSelectedType(type);
    }else{
      setSelectedStyleSet('');
      setSelectedType('');
    }

  }, [type, style]);

  const scrollTop = (v) => {
    window.scrollTo({
      top: 0,
      behavior: v || "instant",
    });
  };

  const handleTypeChange = (v) => {
    scrollTop();
    setPage(1);
    setSelectedType(v);
    const params = new URLSearchParams(searchParams);
    params.set("t", v);
    if (v === "Others") {
      params.set("s", "standard");
    }
    setSearchParams(params.toString());
  };
  const handleFree = (v) => {
    setIsFree(!v);
    setIsPaid(false);
    setIsAllStyles(false);
    scrollTop();
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (!v) {
      if (searchParams.size > 0) {
        params.set("m", "Free");
      } else {
        params.set("s", "standard");
        params.set("t", "Classic");
        params.set("m", "Free");
      }
    } else {
      params.delete("m");
    }
    setSearchParams(params.toString());
  };
  const handlePaid = (v) => {
    setIsPaid(!v);
    setIsFree(false);
    scrollTop();
    setPage(1);
    setIsAllStyles(false);
    const params = new URLSearchParams(searchParams);
    if (!v) {
      if (searchParams.size > 0) {
         params.set("m", "Paid");
       } else {
          params.set("s", "standard");
          params.set("t", "Classic");
          params.set("m", "Paid");
       }
    } else {
      params.delete("m");
    }
    setSearchParams(params.toString());
  };

  const handleAllStyles = (isAllStyles) => {
    setIsPaid(false);
    setIsFree(false);
    setIsAllStyles(true);
    const params = new URLSearchParams(searchParams);
    if (!isAllStyles) {
      navigate({ pathname: window.location.pathname });
      setSelectedType("");
    }
    params.delete("m");
  };

  const typeAndStyleHandler = (type, style) => {
    setIsAllStyles(false);
    scrollTop();
    setPage(1);
    setSelectedStyleSet(style);
    setSelectedType(type);
    const params = new URLSearchParams(searchParams);
    params.set("s", style);
    params.set("t", type);
    params.delete("style-set");
    setSearchParams(params.toString());
  };

  return (
    <div className={Styles.filter_sidebar_wraper}>
      <div
        className={`${Styles.filter_sidebar} ${
          currentWondow <= 600 && Styles.mobile_view
        }`}
      >
        <div className={Styles.sections}>
          <p className={Styles.section_header}>Type</p>
          <FilterOptions
            IconComp={LogosIcon}
            lable={"Brand"}
            active={selectedType === "Brand" ? true : false}
            disable={false}
            onClick={() => handleTypeChange("Others")}
          />
        </div>
        <div className={Styles.sections}>
          <p className={Styles.section_header}>All</p>
          <FilterOptions
            IconComp={PaidIcon}
            lable={"Paid"}
            active={isPaid}
            onClick={() => handlePaid(isPaid)}
          />
          <FilterOptions
            IconComp={FreeIcon}
            lable={"Free"}
            active={isFree}
            onClick={() => handleFree(isFree)}
          />
        </div>
        <div className={Styles.sections}>
          <p className={Styles.section_header}></p>
          <FilterOptions
            IconComp={AllIcon}
            lable={"All Styles"}
            active={isAllStyles}
            onClick={() => handleAllStyles(isAllStyles)}
          />
        </div>
        <div className={Styles.sections}>
          {combinedPairs?.length > 0 &&
            combinedPairs?.map((v, i) => (
              <div key={i} className={Styles.style_set_cont}>
                <p
                  className={`${Styles.section_header} ${Styles.styleSet_headers}`}
                >
                  {v?.type}
                </p>
                {v?.allStyles?.map((style, index) => (
                  <FilterOptions
                    key={index}
                    icon={
                      "/icons/sidebaricons/" +
                      v?.type +
                      " " +
                      style?.styleSet +
                      ".svg"
                    }
                    lable={` ${v?.type} ${style?.styleSet}`}
                    active={
                      selectedStyleSet?.toLowerCase() ==
                        style?.styleSet.toLowerCase() &&
                      selectedType?.toLowerCase() == v?.type?.toLowerCase()
                        ? true
                        : false
                    }
                    disable={selectedType == "Brand" ? true : false}
                    count={v?.count}
                    onClick={() =>
                      typeAndStyleHandler(
                        style?.type,
                        style?.styleSet.toLowerCase()
                      )
                    }
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
