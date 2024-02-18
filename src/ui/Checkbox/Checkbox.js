import React, { useState } from 'react'

import './styles.scss'

const Checkbox = () => {
  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          type="checkbox"
          className="checkbox__input"
          checked={isOn}
          onChange={handleToggle}
        />
        <span className="checkbox__slider" />
      </label>
    </div>
  );
}

export default Checkbox