import "./style.css"
import BRAND_ICON from "../../assets/svg/OS.svg";
import { useRef } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-material/dist/all.css";
import { useLocation } from "react-router-dom";
import useUser from "../../hooks/user/user";
import NavBar from "../../components/NavBar/NavBar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function Invoice() {
    const {
        useInvoiceDetail
    } = useUser()

    let query = useQuery();
    const paymentIntent = query.get('paymentIntent')
    const userId = query.get('userId')

    const { invoiceDetail } = useInvoiceDetail({
        paymentIntent: paymentIntent,
        userId: userId
    });
    const pdfExportComponent = useRef(null);
    const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
    };


    return (
        <>
            <div id="example">
                <NavBar />
                <div className="page-container hidden-on-narrow">
                    <button primary={true} className="btn-download" onClick={handleExportWithComponent}>
                        Download
                    </button>
                    <PDFExport ref={pdfExportComponent}>
                        <div className="invoice-main element-to-print size-a4 pdf-page">
                            <div className="invoice-head inner-page">
                                <div>
                                    <img src={BRAND_ICON} alt="logo" height={30}></img>
                                </div>
                                <div className="invoice-title">
                                    <p>Invoice</p>
                                </div>
                            </div>
                            <div className="hr-invoice"></div>
                            <div className="detail-part">
                                <div>
                                    <h1 className="title-bill">Bill To:</h1>
                                    <p>{invoiceDetail?.name}</p>
                                    <p>{invoiceDetail?.city}, {invoiceDetail?.state} , {invoiceDetail?.country} - {invoiceDetail?.zipCode}</p>
                                    <p>E: {invoiceDetail?.email}</p>
                                </div>
                                <div className="bill-detail">
                                    <div className="left-side">
                                        <h1>Invoice Number:</h1>
                                        <p>Issue Date: </p>
                                        <p>Due Date: </p>
                                    </div>
                                    <div className="right-side">
                                        <h1>{invoiceDetail?.invoiceNumber}</h1>
                                        <p>{invoiceDetail?.issue_date}</p>
                                        <p>{invoiceDetail?.due_date}</p>
                                    </div>

                                </div>
                            </div>

                            <div class="bill-part">
                                <div>
                                    <h1>Description</h1>
                                </div>
                                <div className="under-div">
                                    <h1 style={{ width: "40px" }}>Qty.</h1>
                                    <h1 style={{ width: "60px" }}>Unit Price</h1>
                                    <h1 style={{ width: "50px", textAlign: "end" }}>Amount</h1>
                                </div>
                            </div>
                            <div className="hr-invoice-table"></div>
                            <div class="bill-part-desc">
                                <div>
                                    <p>{invoiceDetail?.Description}</p>
                                </div>
                                <div className="under-div">
                                    <p style={{ width: "40px" }}>{invoiceDetail?.qty}</p>
                                    <p style={{ width: "60px" }}>${invoiceDetail?.amount}</p>
                                    <p style={{ width: "50px", textAlign: "end" }}>${invoiceDetail?.amount}</p>
                                </div>
                            </div>
                            <div className="hr-invoice-table"></div>
                            <div className="total-amount">
                                <div className="left-side">
                                    <p>Sub Total:</p>
                                    <p>Taxes: </p>
                                    <p>Discount: </p>
                                </div>
                                <div className="right-side">
                                    <p>${invoiceDetail?.amount}</p>
                                    <p>$00.00</p>
                                    <p>-$00.00</p>
                                </div>
                            </div>
                            <div className="hr-invoice-half-table"></div>
                            <div className="total-amount2">
                                <div className="left-side">
                                    <p>Total:</p>
                                </div>
                                <div className="right-side">
                                    <p>${invoiceDetail?.amount}</p>
                                </div>
                            </div>
                            <div className="hr-invoice-half-table"></div>
                        </div>
                    </PDFExport>
                </div>
            </div>
        </>
    )
}