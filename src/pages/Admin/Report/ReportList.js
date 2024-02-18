import "./style.css";
import useUser from "../../../hooks/user/user";
import { Navigation } from "../../../components/FormControles/Navigation/navigation";
import { Form, Formik } from "formik";
import { LabledInputBox } from "../../../components/FormControles/index";
import { DataTableBase } from "../../../components/DataTableBase";
import { useNavigate } from "react-router-dom";
import { NextSVG } from "../../../assets/svg";
import { AdminSidebar } from '../components';
export function ReportList() {
  const { useGetReportList } = useUser();

  const navigate = useNavigate();
  const columns = [
    {
      name: "Full Name",
      selector: (row) => {
        return (
          <div className="account-name-con">
            <label className="account-name">
              {row?.firstName && row?.lastName
                ? row?.firstName[0] + row?.lastName[0]
                : "?"}
            </label>{" "}
            {row.fullName
              ? row.fullName
              : row?.firstName || row?.lastName
                ? row?.firstName + " " + row?.lastName
                : "-"}
          </div>
        );
      },
      maxWidth: "18%",
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "plan",
      selector: (row) => row.plan,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "location",
      selector: (row) => row.billDetails.city,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Downloads",
      selector: (row) => row.downloads,
      sortable: true,
      maxWidth: "15%",
      minWidth: "50px",
    },
    {
      name: "recent download",
      selector: (row) => row.recentDownloads,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "",
      selector: (row) => <NextSVG />,
      sortable: true,
      maxWidth: "5%",
      minWidth: "10px",
    },
  ];
  const { report, onSearch } = useGetReportList();

  return (
    <>
      <div className="cust-container">
        <div className="cust-list-nav-bar">
          <Navigation lable={"report"} />
          <div className="container-body" style={{ marginTop: 76, display: 'flex' }}>
            <AdminSidebar></AdminSidebar>
            <div className="admin-container-body">
            <Formik initialValues={{ search: "" }}>
              {({ values, isValid, setFieldValue }) => {
                if (values.search !== "") onSearch(values.search);
                return (
                  <Form>
                    <div className="cust-search-sec">
                      <div className="search-input-con">
                        <div>
                          <LabledInputBox
                            name="search"
                            type={"search"}
                            placeholder="Search"
                            autoComplete="off"
                            values={values.search}
                            inputSize="md"
                          />
                        </div>
                      </div>
                      <div className="product-view">
                        <div>
                          <LabledInputBox
                            type={"select"}
                            autoComplete="off"
                            selSize="sm"
                          />
                        </div>
                        <div>
                          <LabledInputBox
                            type={"select"}
                            autoComplete="off"
                            selSize="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                );
              }}
              </Formik>
              <div className="padding">
                <DataTableBase
                  columns={columns}
                  data={report && report.users}
                  progressPending={!report}
                  onRowClicked={(userDetails) => {
                    navigate("/admin/reportDetails", {
                      state: {
                        userDetails: {
                          ...userDetails,
                          fullName: userDetails.fullName
                            ? userDetails.fullName
                            : userDetails?.firstName || userDetails?.lastName
                              ? userDetails?.firstName + " " + userDetails?.lastName
                              : "-",
                        },
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
