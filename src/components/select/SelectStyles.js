function SelectStyles({ size, showError }) {
  // const borderColor = showError
  //   ? getColor("func-negative")
  //   : getColor("grey-g85");
  // const focusedBorderColor = showError
  //   ? getColor("func-negative")
  //   : getColor("grey-g80");

  return {
    control: (provided, state) => ({
      ...provided,
      // backgroundColor: getColor("system-bg"),
      // borderColor,
      borderWidth: 0.5,
      borderRadius: 2,
      // minHeight: getHeight(size),
      "&:hover": {
        borderColor: "#000",
        cursor: "pointer",
      },
      ...(state.isFocused && {
        boxShadow: "none",
        // borderColor: focusedBorderColor,

        "&:hover": {
          // borderColor: focusedBorderColor,
        },
      }),
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 0 0 10px",
      // '& input': {
      //   marginLeft: '10px !important',
      // },
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      height: "100%",
      fontFamily: "DM Sans",
      fontStyle: "normal",
      fontWeight: " 500",
      fontSize: " 13px",
      lineHeight: " 17px",
      // color: getColor("dark-d25"),
    }),
    placeholder: (provided) => ({
      ...provided,
      // color: getColor("grey-g65"),
      fontSize: "0.875rem",
      marginLeft: "0 !important",
      width: "100%",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      ...(state.isDisabled && {
        opacity: 0.25,
      }),
      "& > div": {
        padding: "0 0.25rem",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      margin: "0rem 0",
      borderRadius: 4,
      border: "1px solid #F0F0F4",
      boxShadow:
        "0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
      zIndex: 10,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0.25rem 0",
      // color: getColor("dark-d25"),
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "0.75rem",
      // color: getColor("dark-d25"),
      margin: 0,
      ...(state.isDisabled && {
        opacity: 0.25,
      }),
      padding: "0 3px",
    }),
    option: (provided, state) => ({
      ...provided,
      padding: "10px 20px ",
      borderRadius: 4,

      fontFamily: "DM Sans",
      fontStyle: "normal",
      fontWeight: " 500",
      fontSize: " 13px",
      lineHeight: " 17px",
      cursor: "pointer",
      color: " #000000",
      ...((state.isFocused || state.isSelected) && {
        // backgroundColor: getColor("system-bg"),
        // backgroundColor: "#7238fa",
        // color: getColor("dark"),
        // border: "0.5px solid #E3E4E7",
        // boxShadow: " 1px 1px 5px rgba(0, 0, 0, 0.1)",
        // borderRadius: " 2px",
        fontFamily: "DM Sans",
        fontStyle: "normal",
        fontWeight: " 500",
        fontSize: " 13px",
        lineHeight: " 17px",
        backgroundColor: "unset",
      }),

      ...(state.isDisabled && {
        opacity: 0.5,
        cursor: "default",
      }),
      "&:hover": {
        // border: "1px solid #7238fa",
      },
      "&:active": {
        backgroundColor: "#fff",
        // backgroundColor: getColor("light-main"),
        // border: "1px solid #7238fa",
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
      fontWeight: 400,
      // color: getColor("dark-d25"),
      padding: "0.25rem 0.5rem",
    }),
    loadingMessage: (provided) => ({
      ...provided,
      fontSize: "0.75rem",
      fontWeight: 400,
      // color: getColor("light"),
      padding: "0.25rem 0.5rem",
    }),
    multiValue: (provided) => ({
      ...provided,
      // backgroundColor: getColor("grey-g95"),
      borderRadius: "100px",
      padding: "0px 6px",
      height: "20px",
      "& div": {
        padding: "0",
      },
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      // fontSize: typography.caption.fontSize,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      cursor: "pointer",
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "transparent",
      },
      "& svg": {
        width: 16,
        height: 16,
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        height: "1rem",
        width: "1rem",
      },
    }),
  };
}
export default SelectStyles;
