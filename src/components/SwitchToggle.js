import React from "react";
import { Switch as MuiSwitch } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { grey, orange } from "@mui/material/colors";

const useStyles = makeStyles({
  root: (props) => ({
    width: "28px!important",
    height: "16px!important",
    padding: "0!important",
    display: "flex",
    opacity: (props) => (props.disabled ? 0.75 : 1),
  }),
  switchBase: {
    padding: "2px!important",
    color: "#fff!important",
    "&$checked": {
      transform: "translateX(12px)!important",
      color: "#fff",
      "& + $track": {
        opacity: "1!important",
        backgroundColor: "#7238FA!important",
      },
    },
    "&.Mui-disabled": {
      color: "#fff",
    },
  },
  thumb: (props) => ({
    width: "12px!important",
    height: " 12px!important",
    zIndex: -1,
    boxShadow: " 0px 3px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#ffffff",
  }),
  track: (props) => ({
    // border: `1px solid ${getColor('system-bg')}`,
    borderRadius: 29,
    opacity: 1,
    backgroundColor: props.trackBgColor || grey,
  }),
  checked: {},
});

export default function SwitchToggle({
  id,
  onChange,
  disabled,
  switchColor,
  width,
  height,
  thumbWidth,
  thumbHeight,
  trackBgColor,
  bgColor,
  defaultChecked,
}) {
  const classes = useStyles({
    disabled,
    switchColor,
    width,
    height,
    thumbWidth,
    thumbHeight,
    trackBgColor,
    bgColor,
  });
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };
  return (
    <div container direction="column" className="vastav">
      <MuiSwitch
        id={id}
        defaultChecked={defaultChecked}
        checked={defaultChecked}
        onChange={handleChange}
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        disabled={disabled}
      />
    </div>
  );
}
SwitchToggle.propTypes = {
  id: PropTypes.string,
  defaultChecked: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  thumbWidth: PropTypes.string,
  thumbHeight: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  trackBgColor: PropTypes.string,
  bgColor: PropTypes.string,
  switchColor: PropTypes.string,
};
