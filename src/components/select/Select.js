import { Grid, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select";

// import { CloseIcon, DropDownIcon } from "../../../assets/icons";
import SelectStyles from "./SelectStyles";
import { DropdownIcon } from "../../assets/svg";

const Select = forwardRef(
  (
    {
      id,
      name,
      options,
      onChange,
      value,
      label,
      labelVariant,
      labelSpacing = 2,
      width,
      spacing,
      placeholder = "Select",
      size,
      disabled,
      loading,
      onInputChange,
      searchable = true,
      clearable = false,
      multi,
      menuPosition = "absolute",
      onBlur,
      error,
      LabelProps,
      onClick,
      Components,
      modifyStyles,
      className,
      backgroundTheme = "light",
      isCompay,
      ...props
    },
    ref
  ) => {
    const val = typeof value === "string" ? null : value;
    const handleChange = (e) => {
      if (onChange) {
        onChange((name, e));
      }
    };

    const useStyles = makeStyles(() => ({
      root: {
        // marginBottom: (props) => theme.spacing(props.spacing),
        width: (props) => props.width,
        position: "relative",
      },
      container: {
        position: "relative",
        maxWidth: "100%",
        overflow: "visible",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        // backgroundColor: getColor("system-bg"),
      },
      placeHolder: {
        marginLeft: "0px",
        color: "#18181C",
        // color: (props) => (props?.disabled ? "#C3C5D5" : getColor("grey-g65")),
      },
      errorIcon: {
        position: "absolute",
        right: "0",
        zIndex: "111",
      },
      labelTypography: {
        // fontSize: typography.paragraph2.fontSize,
        // fontWeight: typography.paragraph2.fontWeight,
        margin: "0",
      },
    }));
    const classes = useStyles({ width, spacing, disabled });
    const theme = useTheme();

    const showError = error;
    const styles = useMemo(() => {
      const styles = SelectStyles({ size, showError, backgroundTheme });
      return modifyStyles ? modifyStyles(styles, theme) : styles;
    }, [size, showError, backgroundTheme, modifyStyles, theme]);

    function DropdownIndicator(props) {
      return (
        <components.DropdownIndicator {...props}>
          <DropdownIcon />
        </components.DropdownIndicator>
      );
    }
    function ClearIndicator(props) {
      return (
        <components.ClearIndicator {...props}>
          {/* <CloseIcon /> */}
        </components.ClearIndicator>
      );
    }

    function MultiValueRemove(props) {
      return (
        <components.MultiValueRemove {...props}>
          {/* <CloseIcon /> */}
        </components.MultiValueRemove>
      );
    }
    const NoOptionsMessage = (props) => (
      <components.NoOptionsMessage {...props}>
        {isCompay ? (
          <Typography variant="paragraph1">No company found</Typography>
        ) : (
          <Typography variant="paragraph1"> No options</Typography>
        )}
      </components.NoOptionsMessage>
    );
    return (
      <Grid
        direction="column"
        className={classNames(classes.root, className)}
        onClick={onClick}
      >
        {label && (
          <p
            className={"typo-p"}
            spacing={labelSpacing}
            variant={labelVariant}
            {...LabelProps}
          >
            {label}
          </p>
        )}

        <div className={classes.container}>
          <ReactSelect
            id={id}
            isMulti={multi}
            options={options}
            styles={styles}
            components={{
              DropdownIndicator,
              MultiValueRemove,
              ClearIndicator,
              NoOptionsMessage,
              ...Components,
            }}
            placeholder={
              <span className={classes.placeHolder}>{placeholder}</span>
            }
            ref={ref}
            closeMenuOnScroll
            isClearable={clearable}
            name={name}
            value={val}
            onChange={handleChange}
            onBlur={onBlur}
            isDisabled={disabled}
            isLoading={loading}
            isSearchable={searchable}
            onInputChange={onInputChange}
            menuPosition={menuPosition}
            backspaceRemovesValue={false}
            {...props}
          />

          {/* {showError && <ErrorMessage formField>{error}</ErrorMessage>} */}
        </div>
      </Grid>
    );
  }
);
Select.displayName = "Select";
export const Option = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.any,
  badge: PropTypes.string,
});

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  options: PropTypes.arrayOf(Option) || undefined,
  multi: PropTypes.bool,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelVariant: PropTypes.oneOf(["primary", "secondary"]),
  labelSpacing: PropTypes.number,
  width: PropTypes.any,
  spacing: PropTypes.number,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  searchable: PropTypes.bool,
  onInputChange: PropTypes.func,
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  menuPosition: PropTypes.oneOf(["absolute", "fixed"]),
  isCompay: PropTypes.bool,
  // closeMenuOnScroll: PropTypes.oneOf([boolean, () => boolean]),
  onBlur: PropTypes.func,
  error: PropTypes.string,
  LabelProps: PropTypes.object,
  onClick: PropTypes.func,
  Components: PropTypes.object,
  modifyStyles: PropTypes.func,
  className: PropTypes.string,
  backgroundTheme: PropTypes.oneOf(["white", "black"]),
};
export default Select;
