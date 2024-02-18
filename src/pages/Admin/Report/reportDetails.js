import "./style.css";
import { useLocation } from "react-router-dom";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import { DataTableBase } from "../../../components/DataTableBase";
import products from "../../../assets/dummyData/productlst";
import { } from "../../../components/FormControles/index";
import { OSAdvanceSVG } from "../../../assets/svg";

export function ReportDetail() {
  const location = useLocation();
  const userDetails = location.state.userDetails;
  const columns = [
    {
      name: "Icon",
      selector: (row) => row.url,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "type",
      selector: (row) => row.type,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "#",
      selector: (row) => "#" + row.lable,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "KeyWorks",
      selector: (row) => row.keywords,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Name",
      selector: (row) => row.lable,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      minWidth: "80px",
    },
  ];

  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"report"} />
          <div className="container-body">
            <div className="cust-search-sec">
              <div className="align-items">
                <div className="report-detail-acc">
                  {userDetails?.firstName && userDetails?.lastName
                    ? userDetails?.firstName[0] + userDetails?.lastName[0]
                    : "?"}
                </div>
                <div>
                  <div className="report-hed">
                    <p>{userDetails.fullName}</p>
                    <OSAdvanceSVG />
                  </div>
                  <div>
                    <ul className="report-text">
                      <li className="report-text-item">{userDetails.email}</li>
                      <li>{userDetails.billDetails.city}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="product-view">
                <div className="report-text">Total Downloads: 300</div>
              </div>
            </div>
          </div>
          <div className="padding">
            <DataTableBase
              columns={columns}
              data={products}
              progressPending={!products}
            />
          </div>
        </div>
      </div>
    </>
  );
}
