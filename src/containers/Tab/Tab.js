import "./style.css";
import React, { useState } from "react";

export function Tab({ TabProperties }) {
  const [selectedValue, setSelectedValue] = useState(0);

  const handelTabChange = (event, index) => {
    if (selectedValue !== index) setSelectedValue(index);
  };

  return (
    <div>
      <div className="tab-main">
        <div className="tab-header">
          {TabProperties.map((data, index) => {
            return (
              <div key={index} onClick={(e) => handelTabChange(e, index)}>
                <div
                  className={`tab-head-nav ${
                    selectedValue === index ? "head-active" : ""
                  }`}
                >
                  {data.header}
                </div>
              </div>
            );
          })}
        </div>
        <div className="tab-body">
          <div className="tab-page-con">
            <>{TabProperties[selectedValue].page}</>
          </div>
        </div>

        {/* {TabProperties[selectedValue].header === "Settings" && (
          // <>
          //   <div className="tab-acc-del">
          //     <p>Delete my Account</p>
          //   </div>
          // </>
        )} */}
      </div>
    </div>
  );
}
