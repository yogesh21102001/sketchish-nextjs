import React from "react";
import { OSColorSVG } from "../../../assets/svg";

function ProductGridView({ productList }) {
  return (
        <div className="search-res-icon">
          {productList?.map((data) => (
            <div
              className={`search-res-item ${
                data.label?._id === data._id ? "" : ""
              }`}
              key={data._id}
            >
              {data?.paid ? (
                <div></div>
              ) : (
                <div>
                  <OSColorSVG className={`os-color-svg `} />
                </div>
              )}

              {data.url}

              <div className={"pl-ls-ico-con"}>
                <img src={data.previewUrl} alt="" className={"pl-ls-ico"} />
              </div>
              <label className="icon-text">{data.label}</label>
            </div>
          ))}
    </div>
  );
}

export default ProductGridView;
