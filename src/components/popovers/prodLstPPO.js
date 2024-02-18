import React from "react";
import { notifySuccess } from "../../utils/notify";
import "./style.css";

export function ProdLstPPO({ setClickedMore, productData }) {
  const handleClose = () => setClickedMore("");

  const handelEdit = async () => {
    handleClose();
  };

  const handelArchive = async () => {
    handleClose();
    notifySuccess("Archived Successfully.");
  };

  return (
    <div className="clp-popover-container clp-p-c-margin-right">
      <div className="clp-p-i-link">
        <div className="clp-popover-items" onClick={handelEdit}>
          Edit
        </div>
      </div>
      <div className="clp-p-i-link">
        <div className="clp-popover-items" onClick={handelArchive}>
          Archive
        </div>
      </div>
    </div>
  );
}
