import React, { useState } from "react";
import { ChromePicker, SketchPicker, CompactPicker } from "react-color";
import rgbHex from "rgb-hex";

const ColorPicker = ({ picker = "chrome", initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (newColor) => {
    const hex =
      "#" +
      rgbHex(newColor.rgb.r, newColor.rgb.g, newColor.rgb.b, newColor.rgb.a);
    setColor(hex);
    onChange(hex);
  };

  if (picker === "chrome") {
    picker = (
      <ChromePicker
        color={color}
        onChange={handleColorChange}
        disableAlpha={false}
      />
    );
  } else if (picker === "sketch") {
    picker = <SketchPicker color={color} onChange={handleColorChange} />;
  } else if (picker === "compact") {
    picker = <CompactPicker color={color} onChange={handleColorChange} />;
  }

  return <div>{picker}</div>;
};

export default ColorPicker;
