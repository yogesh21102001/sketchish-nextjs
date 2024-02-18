import React, { useState, useRef, useEffect } from "react";

// Style //
import Styles from "./style.module.css"


const CustomDropDown = ({
  lable,
  options,
  onChange,
  onSelect,
  value,
  selectedValue,
  openTop,
  width,
  dropdownWidth,
  IconBtn,
  positionLeft,
  className,
  dropDownZindex,
  alert,
  height,
  placeholder
}) => {
  // Hooks //
  const dropdownRef = useRef();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsChecked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  //   Handlers //
  const optionsHendler = (item) => {
    setIsChecked(false);
    onSelect(item);
  };

  return (
    <div
      className={`${isChecked ? Styles.open : ""} ${
        Styles.custom_dropdown
      } ${className}`}
      ref={dropdownRef}
      style={{
        width: width ? width : "6rem",
        zIndex: dropDownZindex,
        height: height ? height : "",
      }}
    >
      <div className={Styles.sec_center}>
        {IconBtn ? (
          <button
            className={Styles.dropdown_btn}
            onClick={() => setIsChecked(!isChecked)}
          >
            <IconBtn />
          </button>
        ) : (
          <button
            className={Styles.dropdown_btn}
            onClick={() => setIsChecked(!isChecked)}
          >
            {value ? value : placeholder ? <p>{placeholder}</p> : lable}
            <svg
              className={Styles.arrow}
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="32"
              viewBox="0 0 8 32"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.64648 18.3536L0.646484 15.3536L1.35359 14.6465L4.00004 17.2929L6.64648 14.6465L7.35359 15.3536L4.35359 18.3536L4.00004 18.7071L3.64648 18.3536Z"
                fill="black"
                fill-opacity="0.3"
              />
            </svg>
          </button>
        )}
        <div
          className={`${Styles.section_dropdown} ${
            openTop ? Styles.openTop : ""
          }`}
          style={{
            width: dropdownWidth ? dropdownWidth : "100%",
            left: positionLeft ? positionLeft : 0,
          }}
        >
          {options.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => optionsHendler(item)}
                className={`${Styles.option_cont} ${alert ? Styles.alert : ""}`}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomDropDown;
