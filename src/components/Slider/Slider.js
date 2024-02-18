import "./style.css";
// import React, { useState } from "react";
import Slider from "react-slider";

const ReactSlider = ({ value = 4, setValue }) => {
  // const [value, setValue] = useState(4);

  const handleOnChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Slider
      value={value}
      onChange={handleOnChange}
      min={0.1}
      max={4}
      step={0.1}
      className="react-slider"
      thumbClassName="react-slider-thumb"
      trackClassName="react-slider-track"
      renderThumb={(props, state) => (
        <div {...props}>{false && state.valueNow}</div>
      )}
      ariaLabel={["Minimum thumb", "Maximum thumb"]}
    />
  );
};

export default ReactSlider;
