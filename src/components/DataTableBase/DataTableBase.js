import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { SortBySVG } from "../../assets/svg";
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

createTheme(
  "solarized",
  {
    text: {
      primary: "#18181C",
      secondary: "#2aa198",
    },
    background: {
      default: "#FFF",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#E6E7EB",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(227, 228, 231, 1)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      height: "30px",
      fontstyle: "normal",
      fontWeight: "700",
      fontSize: "13px",
      lineHeight: "17px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      height: "70px",
    },
  },
};

export function DataTableBase(props) {
  return (
    <DataTable
      selectableRowsComponentProps={selectProps}
      dense
      sortIcon={<SortBySVG />}
      fixedHeader={true}
      fixedHeaderScrollHeight={400}
      customStyles={customStyles}
      pointerOnHover={true}
      theme="solarized"
      {...props}
    />
  );
}
