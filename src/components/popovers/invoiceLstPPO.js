import React from "react";
import "./style.css";

export function InvoiceLstPPO({ setClickedMore, invoiceData }) {
  const handleClose = () => setClickedMore("");
  const paymentIntent = invoiceData.paymentIntent;
  const userId = invoiceData.userId
  const handelInvoiceDownload = async () => {
    window.open(`https://openstroke-dev.web.app/invoice?paymentIntent=${paymentIntent}&userId=${userId}`);
    // handleClose();
  };

  const handelInvoiceDownload2 = async () => {
    window.open(invoiceData.paymentLink);
    handleClose();
  };

  return (
    <div className="clp-popover-container clp-p-c-margin-right">
      <div className="clp-p-i-link">
        {invoiceData && invoiceData.invoiceLink && (
          <div className="clp-popover-items" onClick={handelInvoiceDownload}>
            Download Invoice
          </div>
        )}
        {invoiceData && invoiceData.paymentLink && (
          <div className="clp-popover-items" onClick={handelInvoiceDownload2}>
            Payment Info
          </div>
        )}
      </div>
    </div>
  );
}
