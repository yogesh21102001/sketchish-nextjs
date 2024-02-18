import "./style.css";
import React, { useState } from "react";
import { DataTableBase } from "../../../components/DataTableBase";
import useUser from "../../../hooks/user/user";
import { format } from "date-fns";
// import { map } from "lodash";
import { CheckBox } from "../../../assets/ossvg";
import { Popover } from "react-tiny-popover";
import { MoreSVG } from "../../../assets/svg";
import { InvoiceLstPPO } from "../../../components/popovers";

export function InvoiceTab() {
  const { useGetInvoice } = useUser();
  const [isClickedMore, setClickedMore] = useState("");

  const { invoice } = useGetInvoice();

  const columns = [
    {
      name: "Date",
      selector: (row) => format(new Date(row.date), "dd MMM yyyy"),
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Amount",
      selector: (row) =>
        row.currency === "inr" ? `₹${row.amount}` : `S${row.amount}`,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Status",
      selector: (row) => {
        return row.status !== "paid" ? (
          <div>
            <label
              style={{
                color: "#E5412E",
              }}
              className={row?.status && "status-con"}
            >
              Failed
            </label>
          </div>
        ) : (
          <div className="paid-check">
            <CheckBox /> Paid
          </div>
        );
      },
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "",
      selector: (row) => {
        return (
          <>
            {row.status === "failed" && (
              <div
                onClick={() => {

                }}
              >
                <label className={"repay-link"}>Pay Now</label>
              </div>
            )}
            {row.refundedAmount && row.refundedAmount > 0 && (
              <div
                style={{
                  marginRight: "10px",
                }}
              >
                <label className={row?.status && "status-con"}>Refunded</label>
              </div>
            )}
          </>
        );
      },
      maxWidth: "15%",
      sortable: true,
      minWidth: "10px",
    },
    {
      cell: (row) => {
        return (
          row &&
          row.invoiceLink && (
            <Popover
              isOpen={isClickedMore === row?._id}
              positions={["bottom", "left", "right", "top"]}
              content={
                <InvoiceLstPPO
                  setClickedMore={setClickedMore}
                  invoiceData={row}
                />
              }
              onClickOutside={() => {
                setClickedMore("");
              }}
            >
              <MoreSVG
                id={row.id}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setClickedMore(row?._id);
                }}
              />
            </Popover>
          )
        );
      },
      // ignoreRowClick: true,
      maxWidth: "5%",
      minWidth: "30px",
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <div className="tab-page-main">
      <div className="tab-page-header">
        <h4>Invoice</h4>
      </div>

      {/* <div className="ptab-form-con"> */}
      <div>
        <DataTableBase
          columns={columns}
          data={invoice}
          progressPending={!invoice}
        />
      </div>
    </div>
  );
}
