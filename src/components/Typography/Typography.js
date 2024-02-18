import React from "react";
import cn from "classnames";
import "./style.css";

// Defining the HTML tag that the component will support
// const variantsMapping = {
//   h4: "h4",
//   h5: "h5",
//   h6: "h6",
//   sub1: "sub1",
//   body1: "body1",
//   para1: "para1",
//   cap: "cap",
// };

// Create a functional component that take
// variant: the selected html tag
// color: the selected color
// children: the node passed inside the Component
// ...props: the default attribute of the Component
export function Typography({ variant, color, onClick, children, ...props }) {
  // If the variant exists in variantsMapping, we use it.
  // Otherwise, use p tag instead.
  // const Component = variant ? variantsMapping[variant] : "p";

  return (
    <span
      onClick={onClick}
      className={cn({
        [`typography--variant-${variant}`]: variant,
        [`typography--color-${color}`]: color,
      })}
      {...props}
    >
      {children}
    </span>
  );
}
