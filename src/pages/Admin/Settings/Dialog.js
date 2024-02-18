import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import { Dialog as MuiDialog } from "@mui/material";

const useStyles = makeStyles({
  paper: {
    maxWidth: (props) => getMaxWidth(props.size),
    maxHeight: (props) => props.maxHeight,
    height: (props) => props.height,
    width: (props) => props.width,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 0,
    margin: 0,
  },
  backdrop: {
    backgroundColor: (props) => props.backDrop,
  },
});

export default function Dialog({
  children,
  size,
  height,
  maxHeight,
  width,
  onClose,
  className,
  rootClassName,
  open,
  backDrop,
  ...props
}) {
  const classes = useStyles({ size, height, maxHeight, width, backDrop });
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth
      classes={{
        root: rootClassName,
        paper: classNames(classes.paper, className),
      }}
      BackdropProps={{
        classes: {
          root: classes.backdrop,
        },
      }}
      {...props}
    >
      {children}
    </MuiDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  height: PropTypes.any,
  maxHeight: PropTypes.any,
  width: PropTypes.any,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  open: PropTypes.bool,
  backDrop: PropTypes.string,
  onClose: PropTypes.func,
  size: PropTypes.oneOf([
    "3xs",
    "2xs",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "4.5xl",
    "5xl",
    "5.5xl",
    "6xl",
    "12xl",
  ]),
};

function getMaxWidth(size) {
  switch (size) {
    case "3xs":
      return 300;
    case "2xs":
      return 350;
    case "xs":
      return 400;
    case "sm":
      return 450;
    case "md":
      return 500;
    case "lg":
      return 550;
    case "xl":
      return 600;
    case "2xl":
      return 650;
    case "3xl":
      return 700;
    case "4xl":
      return 750;
    case "4.5xl":
      return 790;
    case "5xl":
      return 800;
    case "5.5xl":
      return 840;
    case "6xl":
      return 850;
    case "12xl":
      return 1200;
    default:
      return 500;
  }
}
