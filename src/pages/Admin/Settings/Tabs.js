import { Tab, Tabs as MuiTab } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { PropTypes } from "prop-types";

const useStyles = makeStyles({
  root: {
    "& .MuiTabs-indicator": { backgroundColor: "#7238fa!important" },
    "& .MuiTab-root": { color: "#18181c!important" },
    "& .Mui-selected": { color: "#7238fa!important" },
    fontWeight: 700,
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "DM Sans",
    minHeight: "unset!important",
    "& button": {
      padding: "0",
      marginRight: "20px",
      marginBottom: "9px",
      height: "unset",
      minHeight: "unset",
      minWidth: "auto",
    },
  },
  tabsLabell: {
    textTransform: "capitalize",
    fontWeight: 700,
    fontSize: "13px",
    lineHeight: "17px",
    fontFamily: "DM Sans",
  },
});
// TabLabel
export const Tabs = ({ value, array, onchange, className }) => {
  const classes = useStyles();
  return (
    <>
      <MuiTab
        value={value}
        onChange={onchange}
        className={className || classes.root}
      >
        {array?.map((item, index) => (
          <Tab
            key={index}
            id={item.id}
            label={
              <p className={classes.tabsLabell} variant="body1">
                {item.name || item.tabLabel}
              </p>
            }
          />
        ))}
      </MuiTab>
    </>
  );
};

Tabs.propTypes = {
  value: PropTypes.node,
  array: PropTypes.array,
  onchange: PropTypes.func,
  className: PropTypes.string,
};

// TabPanel

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <p component={"div"}>{children}</p>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number.isRequired,
};
